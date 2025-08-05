import '../styles/loadingContent.css'

export default function LoadingContent() {
  return (
    <div className='scroll-container animate-pulse'>
      <div className='scroll-content '>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className='block-wrapper'>
            <div className='line short' />
            <div className='box' />
            <div className='line medium' />
          </div>
        ))}
      </div>
    </div>
  );
}
