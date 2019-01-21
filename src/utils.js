export function getComponentName (opts){
  return opts && (opts.Ctor.options.name || opts.tag)
}

export function isDef(v) {
  return v !== undefined && v !== null
}