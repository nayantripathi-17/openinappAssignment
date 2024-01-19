import { Avatar, Badge, Card } from '@mantine/core'
import React from 'react'

function DetailsCard({ image, imageColor, badgeColor, description, amount, percentage }: { image: JSX.Element, imageColor: string, badgeColor: string, description: string, amount: string, percentage: string }) {
    return (
        <Card
            withBorder
            classNames={{
                root: `col-span-12 md:col-span-6 xl:col-span-3 px-8 rounded-[20px] shadow-lg border-2 border-[#E0E0E0] flex flex-grow min-w-fit`
            }}>
            <Avatar
                color={imageColor}
                variant="filled"
            >
                {image}
            </Avatar>
            <p className="text-sm pt-4">{description}</p>
            <div className="flex flex-grow justify-between items-end">
                <p className="text-xl pt-2 font-bold">{amount}</p>
                <Badge color={badgeColor} variant="light" size="lg">{percentage}%</Badge>
            </div>
        </Card>
    )
}

export default DetailsCard