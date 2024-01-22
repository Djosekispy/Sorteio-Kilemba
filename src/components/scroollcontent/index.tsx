import ImageScroll from '../imageContent/index'
import './style.css'

const images = [
{
source : '../../assets/apartamento1.jpg',
  title: 'Vivendas Geminadas',
  description: "Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.",
  dimension: '18'
},
{
source : '../../assets/apartamento3.jpg',
  title: 'Apartamentos',
  description: "Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.",
  dimension: '18'
},
{
source : '../../assets/apartamento4.jpg',
  title: 'Vivendas Insoladas',
  description: "Change the underlying component CSS base class name and modifier class names prefix. This is an escape hatch for working with heavily customized bootstrap css.",
  dimension: '18'
},
]

export default function ScrollContentImage(){

	return (
   <>
<div className='my-3'>

<div className='scroll'>
{
	images.map((item, index)=> <div className='mx-3'> <ImageScroll title={item.title} 
		dimension={item.dimension} 
		source={item.source}
		description={item.description}
		 /> </div>)
		}
</div>
</div>
   </>
		);
}