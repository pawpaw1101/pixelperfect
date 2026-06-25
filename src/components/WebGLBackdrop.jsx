import React, { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform float u_variant;

varying vec2 v_uv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float gridLine(vec2 p, float scale, float width) {
  vec2 cell = abs(fract(p * scale) - 0.5);
  vec2 line = smoothstep(vec2(0.5 - width), vec2(0.5), cell);
  return max(line.x, line.y);
}

float dataBars(vec2 p, float t) {
  float bars = 0.0;

  for (float i = 0.0; i < 8.0; i += 1.0) {
    float lane = -0.9 + i * 0.26;
    float band = smoothstep(0.028, 0.0, abs(p.y - lane));
    float gate = smoothstep(0.24, 0.0, abs(fract(p.x * 0.65 + t * (0.08 + i * 0.01) + i * 0.13) - 0.5));
    bars += band * gate;
  }

  return bars;
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);

  float hero = step(2.5, u_variant);
  float campus = step(1.5, u_variant) * (1.0 - hero);
  vec3 cyan = vec3(0.08, 1.0, 1.0);
  vec3 magenta = vec3(1.0, 0.17, 0.39);
  vec3 yellow = vec3(1.0, 0.92, 0.0);
  vec3 accent = mix(cyan, yellow, campus);
  vec3 secondary = mix(magenta, vec3(0.35, 0.72, 1.0), campus);
  vec3 base = mix(vec3(0.018, 0.018, 0.018), vec3(0.02, 0.035, 0.08), campus);

  float t = u_time;
  vec2 parallax = (u_pointer - 0.5) * vec2(0.18, -0.1);
  vec2 drift = p + parallax + vec2(t * 0.028, -t * 0.018);

  float gridA = gridLine(drift, mix(6.0, 14.0, hero), mix(0.018, 0.006, hero));
  float gridB = gridLine(mat2(0.82, -0.57, 0.57, 0.82) * (p - parallax * 0.8) + vec2(-t * 0.018, t * 0.02), mix(12.0, 28.0, hero), mix(0.01, 0.003, hero));
  float bars = dataBars(p + vec2(t * 0.12, 0.0), t);

  float beams = 0.0;
  for (float i = 0.0; i < 6.0; i += 1.0) {
    float angle = i * 1.047 + t * (0.13 + i * 0.012);
    vec2 dir = vec2(cos(angle), sin(angle));
    float dist = abs(dot(p + parallax * 0.5, dir) + sin(t * 0.42 + i) * 0.28);
    beams += smoothstep(0.075, 0.0, dist) * (0.35 + 0.15 * sin(t + i));
  }

  float glitch = step(0.985, noise(vec2(floor(uv.y * 160.0), floor(t * 7.0)))) * smoothstep(0.18, 0.0, abs(fract(uv.x * 5.0 + t) - 0.5));
  float vignette = smoothstep(1.45, 0.2, length(p));
  float scan = 0.018 + 0.018 * sin(uv.y * 620.0 + t * 16.0);
  float gridStrength = mix(1.0, 0.26, hero);
  float motionStrength = mix(1.0, 0.34, hero);
  float barsStrength = mix(1.0, 0.18, hero);
  float scanStrength = mix(1.0, 0.28, hero);
  float glitchStrength = mix(1.0, 0.2, hero);

  vec3 color = base;
  color += accent * (gridA * 0.16 * gridStrength + gridB * 0.08 * gridStrength + beams * 0.16 * motionStrength + bars * 0.09 * barsStrength);
  color += secondary * (beams * 0.09 * motionStrength + glitch * 0.18 * glitchStrength);
  color += accent * scan * scanStrength;
  color *= 0.62 + vignette * 0.55;

  gl_FragColor = vec4(color, 0.95);
}
`;

function makeShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Shader compilation failed.");
  }

  return shader;
}

export default function WebGLBackdrop({ className = "", variant = "pixel" }) {
  const canvasRef = useRef(null);
  const positionClass = className.includes("fixed") ? "" : "absolute";

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
    });

    if (!canvas || !gl) {
      return undefined;
    }

    let frame = 0;
    let disposed = false;
    const pointer = { x: 0.5, y: 0.5 };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      const vertexShader = makeShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = makeShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      const program = gl.createProgram();

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Shader program link failed.");
      }

      const buffer = gl.createBuffer();
      const position = gl.getAttribLocation(program, "a_position");
      const resolution = gl.getUniformLocation(program, "u_resolution");
      const time = gl.getUniformLocation(program, "u_time");
      const pointerUniform = gl.getUniformLocation(program, "u_pointer");
      const variantUniform = gl.getUniformLocation(program, "u_variant");
      const startedAt = performance.now();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
        const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        gl.viewport(0, 0, width, height);
      };

      const onPointerMove = (event) => {
        pointer.x = event.clientX / Math.max(window.innerWidth, 1);
        pointer.y = 1 - event.clientY / Math.max(window.innerHeight, 1);
      };

      const render = (now) => {
        if (disposed) {
          return;
        }

        resize();
        gl.useProgram(program);
        gl.enableVertexAttribArray(position);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(resolution, canvas.width, canvas.height);
        gl.uniform1f(time, (now - startedAt) * 0.001);
        gl.uniform2f(pointerUniform, pointer.x, pointer.y);
        gl.uniform1f(
          variantUniform,
          variant === "hero" ? 3 : variant === "campus" ? 2 : variant === "magenta" ? 1 : 0,
        );
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        if (!reduceMotion) {
          frame = requestAnimationFrame(render);
        }
      };

      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove);
      render(performance.now());

      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      };
    } catch {
      return undefined;
    }
  }, [variant]);

  return (
    <canvas
      aria-hidden="true"
      className={`pointer-events-none ${positionClass} inset-0 h-full w-full ${className}`}
      ref={canvasRef}
    />
  );
}
