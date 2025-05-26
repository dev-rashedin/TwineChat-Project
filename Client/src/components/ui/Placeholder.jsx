import '../../styles/placeholder.css'

const Placeholder = () => {
  return (
    <main className='container'>
      <div className='placeholder' role='status' aria-label='Loading content'>
        <div className='pulse title'></div>
        <div className='pulse subtitle'></div>
        <div className='pulse content-line'></div>
        <div className='pulse content-line'></div>
        <div className='pulse content-line short'></div>
      </div>
    </main>
  );
};

export default Placeholder