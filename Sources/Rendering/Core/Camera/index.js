import * as macro from '../../../macro';
import vtkMath from './../../../Common/Core/Math';
import { vec3, vec4, mat4 } from 'gl-matrix';

/* eslint-disable new-cap */

/*
 * Convenience function to access elements of a gl-matrix.  If it turns
 * out I have rows and columns swapped everywhere, then I'll just change
 * the order of 'row' and 'col' parameters in this function
 */
// function getMatrixElement(matrix, row, col) {
//   const idx = (row * 4) + col;
//   return matrix[idx];
// }

// ----------------------------------------------------------------------------
// vtkCamera methods
// ----------------------------------------------------------------------------

function vtkCamera(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkCamera');

  // Set up private variables and methods
  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();
  // let viewUp = new vec3.fromValues(0, 1, 0);
  // let distance = 0.0002;

  publicAPI.orthogonalizeViewUp = () => {
    // viewUp[0] = getMatrixElement(viewMatrix, 1, 0);
    // viewUp[1] = getMatrixElement(viewMatrix, 1, 1);
    // viewUp[2] = getMatrixElement(viewMatrix, 1, 2);

    // publicAPI.modified();
  };

  publicAPI.setDistance = d => {
    // if (distance === d) {
    //   return;
    // }

    // distance = d;

    // // Distance should be greater than .0002
    // if (distance < 0.0002) {
    //   distance = 0.0002;
    // }

    // // we want to keep the camera pointing in the same direction
    // const vec = model.directionOfProjection;

    // // recalculate FocalPoint
    // model.focalPoint[0] = model.position[0] + vec[0] * distance;
    // model.focalPoint[1] = model.position[1] + vec[1] * distance;
    // model.focalPoint[2] = model.position[2] + vec[2] * distance;

    // // FIXME
    // // computeViewTransform();
    // // computeCameraLightTransform();
    // publicAPI.modified();
  };

  publicAPI.getDistance = () => {

  };

  publicAPI.dolly = angle => {

  };

  publicAPI.setRoll = roll => {

  };

  publicAPI.getRoll = () => {

  };

  publicAPI.roll = angle => {
    const eye = model.position;
    const at = model.focalPoint;
    const up = model.viewUp;
    const viewUpVec4 = vec4.fromValues(up[0], up[1], up[2], 0.0);

    const rotateMatrix = mat4.create();   // FIXME: don't create a new one each time?
    const viewDir = vec3.fromValues((at[0] - eye[0]), (at[1] - eye[1]), (at[2] - eye[2]));
    mat4.rotate(rotateMatrix, rotateMatrix, vtkMath.radiansFromDegrees(angle), viewDir);
    vec4.transformMat4(viewUpVec4, viewUpVec4, rotateMatrix);

    model.viewUp[0] = viewUpVec4[0];
    model.viewUp[1] = viewUpVec4[1];
    model.viewUp[2] = viewUpVec4[2];

    publicAPI.modified();
  };

  publicAPI.azimuth = angle => {

  };

  publicAPI.yaw = angle => {

  };

  publicAPI.elevation = angle => {

  };

  publicAPI.pitch = angle => {

  };

  publicAPI.zoom = factor => {

  };

  publicAPI.setThickness = thickness => {

  };

  publicAPI.setWindowCenter = (x, y) => {

  };

  publicAPI.setObliqueAngles = (alpha, beta) => {

  };

  publicAPI.applyTransform = transform => {

  };

  publicAPI.setEyePosition = eyePosition => {

  };

  publicAPI.getEyePosition = () => {

  };

  publicAPI.getEyePlaneNormal = () => {

  };

  publicAPI.getViewTransformMatrix = () => {
    const eye = model.position;
    const at = model.focalPoint;
    const up = model.viewUp;

    return mat4.lookAt(viewMatrix,
        vec3.fromValues(eye[0], eye[1], eye[2]),  // eye
        vec3.fromValues(at[0], at[1], at[2]),     // at
        vec3.fromValues(up[0], up[1], up[2]));    // up
  };

  publicAPI.getViewTransformObject = () => {

  };

  publicAPI.getProjectionTransformMatrix = (aspect, nearz, farz) => {
    mat4.identity(projectionMatrix);

    // FIXME: Not sure what to do about adjust z buffer here
    // adjust Z-buffer range
    // this->ProjectionTransform->AdjustZBuffer( -1, +1, nearz, farz );

    if (model.parallelProjection) {
      // set up a rectangular parallelipiped
      const width = model.parallelScale * aspect;
      const height = model.parallelScale;

      const xmin = (model.windowCenter[0] - 1.0) * width;
      const xmax = (model.windowCenter[0] + 1.0) * width;
      const ymin = (model.windowCenter[1] - 1.0) * height;
      const ymax = (model.windowCenter[1] + 1.0) * height;

      // mat4.ortho(out, left, right, bottom, top, near, far)
      mat4.ortho(projectionMatrix, xmin, xmax, ymin, ymax, nearz, farz);
    } else if (model.useOffAxisProjection) {
      throw new Error('Off-Axis projection is not supported at this time');
    } else {
      // mat4.perspective(out, fovy, aspect, near, far)
      let fovy = model.viewAngle;
      if (model.useHorizontalViewAngle === true) {
        fovy = model.viewAngle / aspect;
      }
      mat4.perspective(projectionMatrix, fovy, aspect, nearz, farz);
    }

    // No stereo, no view shear at the current time

    return projectionMatrix;
  };

  publicAPI.getProjectionTransformObject = (aspect, nearz, farz) => {
    // return vtkTransform object
  };

  publicAPI.getCompositeProjectionTransformMatrix = (aspect, nearz, farz) => {
    // return glmatrix object
  };

  // publicAPI.getProjectionTransformMatrix = renderer => {
  //   // return glmatrix object
  // };

  publicAPI.setUserViewTransform = transform => {
    // transform is a vtkHomogeneousTransform
  };

  publicAPI.setUserTransform = transform => {
    // transform is a vtkHomogeneousTransform
  };

  publicAPI.render = renderer => {

  };

  publicAPI.getViewingRaysMTime = () => {

  };

  publicAPI.viewingRaysModified = () => {

  };

  publicAPI.getFrustumPlanes = aspect => {
    // Return array of 24 params (4 params for each of 6 plane equations)
  };

  publicAPI.getOrientation = () => {

  };

  publicAPI.getOrientationWXYZ = () => {

  };

  publicAPI.getCameraLightTransformMatrix = () => {

  };

  publicAPI.updateViewport = () => {

  };

  publicAPI.shallowCopy = sourceCamera => {

  };

  publicAPI.deepCopy = sourceCamera => {

  };

  publicAPI.setScissorRect = rect => {
    // rect is a vtkRect
  };

  publicAPI.getScissorRect = () => {

  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

export const DEFAULT_VALUES = {
  position: [0, 0, 1],
  focalPoint: [0, 0, 0],
  viewUp: [0, 1, 0],
  directionOfProjection: [0, 0, -1],
  parallelProjection: false,
  useHorizontalViewAngle: false,
  viewAngle: 30,
  parallelScale: 1,
  clippingRange: [0.01, 1000.01],
  thickness: 1000,
  windowCenter: [0, 0],
  viewPlaneNormal: [0, 0, 1],
  viewShear: [0, 0, 1],
  eyeAngle: 2,
  focalDisk: 1,
  useOffAxisProjection: false,
  screenBottomLeft: [-0.5, -0.5, -0.5],
  screenBottomRight: [0.5, -0.5, -0.5],
  screenTopRight: [0.5, 0.5, -0.5],
  eyeSeparation: 0.06,
  // eyeTransformMatrix: mat4.create(),     // can't do these here, or else
  // modelTransformMatrix: mat4.create(),   // every instance shares same default
  userViewTransform: null,
  userTransform: null,
  leftEye: 1,
  freezeFocalPoint: false,
  useScissor: false,
};

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Make sure we have our own objects
  model.eyeTransformMatrix = mat4.create();
  model.modelTransformMatrix = mat4.create();

  // Build VTK API
  macro.obj(publicAPI, model);
  macro.get(publicAPI, model, [
    'thickness',
    'userViewTransform',
    'userTransform',
  ]);

  macro.setGet(publicAPI, model, [
    'parallelProjection',
    'useHorizontalViewAngle',
    'viewAngle',
    'parallelScale',
    'eyeAngle',
    'focalDisk',
    'useOffAxisProjection',
    'eyeSeparation',
    'eyeTransformMatrix',
    'modelTransformMatrix',
    'leftEye',
    'freezeFocalPoint',
    'useScissor',
  ]);

  macro.getArray(publicAPI, model, [
    'directionOfProjection',
    'windowCenter',
    'viewPlaneNormal',
  ]);

  macro.setGetArray(publicAPI, model, [
    'clippingRange',
  ], 2);

  macro.setGetArray(publicAPI, model, [
    'position',
    'focalPoint',
    'viewUp',
    'viewShear',
    'screenBottomLeft',
    'screenBottomRight',
    'screenTopRight',
  ], 3);

  // Object methods
  vtkCamera(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend);

// ----------------------------------------------------------------------------

export default { newInstance, extend };