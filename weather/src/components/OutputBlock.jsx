import { useSelector } from 'react-redux'
import { IconType } from "../utilities/IconType"
import { WiDayRain } from "react-icons/wi"
import { WiRain } from "react-icons/wi"
import { WiThunderstorm } from "react-icons/wi"
import { WiDaySunny } from "react-icons/wi"
import { WiCloud } from "react-icons/wi"
import { WiCloudy } from "react-icons/wi"


function Icon({ iconType }) {
	let className = 'w-full my-5 text-[5rem]'
	switch (iconType) {
		case IconType.LIGHT_RAIN: return <WiDayRain className={className} />
		case IconType.MODERATE_RAIN: return <WiRain className={className} />
		case IconType.HEAVY_RAIN: return <WiThunderstorm className={className} />
		case IconType.LIGHT_CLOUD: return <WiDaySunny className={className} />
		case IconType.MODERATE_CLOUD: return <WiCloud className={className} />
		case IconType.HEAVY_CLOUD: return <WiCloudy className={className} />
		default: break
	}
	return <></>
}

const OutputBlock = () => {

	const data = useSelector(store => store.weather.data)
	return (
		<div className='flex justify-start gap-x-5 mt-10'>
			{data?.map(item => {
				return (
					<div
						className='shadow-xl rounded-lg text-center px-5 py-2 bg-white/50'
						key={item.id}>
						<Icon iconType={item.iconType} />
						<p className='p-5 pt-0 text-xl'>{item.temp}&#186;C</p>
						<hr className='border-purple-950' />
						<p className='p-5 text-base'>{item.time}</p>
					</div>
				)
			})}
		</div>
	)
}

export default OutputBlock
