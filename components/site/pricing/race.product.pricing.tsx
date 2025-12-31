'use client'
import { Product } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';

export default function RaceProductPricing({product}: {product: Product}) {
        return (
        <BriefContentRow 
            icon={product.icon} chipClass={product.chipClass} 
            name={product.name} 
            mainText={`available for $${product.price}`} 
            subtext={product.brief} />
    )
}
