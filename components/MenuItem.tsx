type MenuItemProps = {
  name: string
  price: number
  description: string
  image?: string
}

export default function MenuItem({ name, price, description, image }: MenuItemProps) {
  return (
    <div className="bg-[#1a1a1a] text-white rounded-xl p-4 shadow-md space-y-2">
      {image && (
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-2" />
      )}
      <h3 className="text-xl font-bold text-[#d4af37]">{name}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-md font-semibold">{price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
    </div>
  )
}
