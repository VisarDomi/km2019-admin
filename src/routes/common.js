export function setMeta(title) {
  let meta = {
        title: `${title}`,
        metaTags: [
          {
            name: "description",
            content: `Kenga Magjike Admin - ${title}`
          },
          {
            property: "og:description",
            content: `Kenga Magjike Admin - ${title}`
          }
        ]
      }
  return meta
}
