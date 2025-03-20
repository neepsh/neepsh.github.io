import * as THREE from "three";
declare class BufferShader {
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    fragment: string;
    uniforms: THREE.ShaderMaterial["uniforms"];
    scene: THREE.Scene;
    readBuffer: THREE.WebGLRenderTarget;
    writeBuffer: THREE.WebGLRenderTarget;
    constructor(renderer: THREE.WebGLRenderer, camera: THREE.Camera, fragment: string, uniforms: THREE.ShaderMaterial["uniforms"], width: number, height: number);
    swapBuffers(): void;
    render(): void;
    createMesh(): void;
}
export default BufferShader;
