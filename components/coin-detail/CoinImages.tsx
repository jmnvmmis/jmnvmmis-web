// Componente de galería de imágenes de moneda
import ImageCarousel from '@/app/components/ImageCarousel';

type CoinImagesProps = {
  imagenes: { url: string }[];
  nombre: string;
};

export default function CoinImages({ imagenes, nombre }: CoinImagesProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl blur-2xl"></div>
      <div className="relative bg-transparent p-3 rounded-2xl">
        <ImageCarousel imagenes={imagenes} nombre={nombre} />
      </div>
    </div>
  );
}
