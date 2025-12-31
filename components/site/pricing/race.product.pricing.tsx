'use client'
import { Product } from '@/content/content';
import RacePricingRow from '@/components/site/pricing/race.pricing.row';

export default function RaceProductPricing({product}: {product: Product}) {
        return (
        <RacePricingRow 
            icon={product.icon} chipClass={product.chipClass} 
            name={product.name} 
            mainText={`available for $${product.price}`} subtext={product.brief} />
    )
}
