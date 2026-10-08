'use client'

import { useState } from 'react'
import { MileagePriceSelector } from '@/components/acura/mileage-price-selector'
import { ProductCardActions } from '@/components/products/product-card-actions'

interface BrandPurchasePanelProps {
  productId: string
  productName: string
  basePrice: number
  tiers?: { low: number; medium: number; high: number }
  productImage: string
  productType: string
  make: string
  shipping?: string
  /** Sheet marks this part quote-only: show "Call for price", no cart. */
  quoteOnly?: boolean
}

/**
 * Client island for server-rendered brand product pages: the mileage tier
 * picker updates the price that flows into Call / Message / Quote / Cart.
 */
export function BrandPurchasePanel({
  productId,
  productName,
  basePrice,
  tiers,
  productImage,
  productType,
  make,
  shipping,
  quoteOnly = false,
}: BrandPurchasePanelProps) {
  // Price of the mileage tier the shopper selected (null = default medium tier).
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-5">
      {quoteOnly ? (
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-primary">Call for price</span>
          <span className="text-sm text-muted-foreground">
            This part is priced by quote. Call us or request a quote for current price and availability.
          </span>
        </div>
      ) : (
        /* Interactive pricing by mileage — exact sheet tiers only */
        <MileagePriceSelector
          basePrice={basePrice}
          tiers={tiers}
          onTierChange={(_, price) => setSelectedPrice(price)}
        />
      )}

      <ProductCardActions
        productId={productId}
        productName={productName}
        productPrice={selectedPrice ?? (tiers?.medium ?? basePrice)}
        productImage={productImage}
        productType={productType}
        make={make}
        shipping={shipping}
        detailsHref={null}
        quoteOnly={quoteOnly}
      />
    </div>
  )
}
