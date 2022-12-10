'use strict'

module.exports = function (manifest) {
  // Required properties
  if (!obj(manifest)) {
    throw new TypeError('Manifest must be an object')
  } else if (!strong(manifest.name)) {
    throw new TypeError('The manifest.name property is required and must be a string')
  } else if (manifest.name.toLowerCase() !== manifest.name) {
    throw new TypeError('The manifest.name property must be lowercase')
  }

  // Optional properties
  if (manifest.version != null && !strong(manifest.version)) {
    throw new TypeError('The optional manifest.version property must be a string')
  } else if (manifest.title != null && !strong(manifest.title)) {
    throw new TypeError('The optional manifest.title property must be a string')
  } else if (manifest.provider != null && !strong(manifest.provider)) {
    throw new TypeError('The optional manifest.provider property must be a string')
  } else if (manifest.wants != null && !obj(manifest.wants)) {
    throw new TypeError('The optional manifest.wants property must be an object')
  } else if (manifest.supports != null && !obj(manifest.supports)) {
    throw new TypeError('The optional manifest.supports property must be an object')
  } else if (manifest.options != null && !obj(manifest.options)) {
    throw new TypeError('The optional manifest.options property must be an object')
  }

  if (manifest.supports && manifest.wants && manifest.options) {
    return manifest
  } else {
    return {
      ...manifest,
      supports: manifest.supports || {},
      wants: manifest.wants || {},
      options: manifest.options || {}
    }
  }
}

function strong (v) {
  return typeof v === 'string' && v !== ''
}

function obj (v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
