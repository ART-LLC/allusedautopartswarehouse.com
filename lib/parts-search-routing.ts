export type PartsSearchFilters = {
  make?: string
  model?: string
  year?: string
  partType?: string
  location?: string
  zipCode?: string
}

function isTransmissionPart(partType: string) {
  return /\btransmissions?\b/i.test(partType)
}

function isEnginePart(partType: string) {
  return /\bengines?\b/i.test(partType) && !isTransmissionPart(partType)
}

/** Converts a make name (e.g. "Mercedes-Benz", "Land Rover") to its brand catalog slug. */
function makeToBrandSlug(make: string) {
  return make.trim().toLowerCase().replace(/\s+/g, '-')
}

export function getPartsSearchUrl(filters: PartsSearchFilters) {
  const partType = filters.partType?.trim() ?? ''
  const make = filters.make?.trim() ?? ''

  // Route to the brand product catalog page whenever a make is selected, so
  // users land on real, sheet-priced listings.
  if (make) {
    const params = new URLSearchParams()
    if (filters.model) params.set('model', filters.model)
    if (isTransmissionPart(partType)) params.set('category', 'transmission')
    else if (isEnginePart(partType)) params.set('category', 'engine')
    if (filters.year) params.set('q', filters.year)

    const query = params.toString()
    const pathname = `/brands/${makeToBrandSlug(make)}`
    return query ? `${pathname}?${query}` : pathname
  }

  // No make selected: the catalog is organised by make, so start at the
  // brand directory.
  return '/brands'
}
