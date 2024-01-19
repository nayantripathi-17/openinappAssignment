export async function GET() {
    const weeklyDataA = [500, 350, 200, 400]
    const weeklyDataB = [400, 450, 300, 350]

    const topProducts = [55, 31, 14]

    return Response.json({
        weeklyData: {
            guest: weeklyDataA,
            user: weeklyDataB
        }, topProducts
    })
}