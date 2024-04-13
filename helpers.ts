import type { Metadata } from "next";

export function isObject(val: any): val is Object {
  return typeof val == "object";
}

export function defineMetadata(meta: Metadata): Metadata {
  if (!meta.openGraph) {
    meta.openGraph = {};
  }

  if (meta.description && !meta.openGraph.description) {
    meta.openGraph.description = meta.description;
  }

  if (meta.title && !meta.openGraph.title) {
    meta.openGraph.title = meta.title;
  }

  return meta;
}
