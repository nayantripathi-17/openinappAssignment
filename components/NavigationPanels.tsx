import React from 'react'

function NavigationPanels({ image, active, description }: { image: JSX.Element, active: boolean, description: string }) {
    return (
        <div className="flex flex-grow items-center justify-center space-x-4 cursor-pointer">
            {image}
            {active ? <p className="text-lg text-white font-bold">{description}</p>:<p className="text-lg text-white">{description}</p>}
        </div>
    )
}

export default NavigationPanels