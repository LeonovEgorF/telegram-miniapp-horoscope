function LazyImage({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

export default LazyImage;
