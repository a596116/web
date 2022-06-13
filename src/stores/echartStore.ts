import { CacheEnum } from "@/enum/cacheEnum"
import { store } from "@/utils"

export const echartStores = defineStore({
    id: 'echart',
    state: () => ({
        cardIndex: store.get(CacheEnum.DASHBOARD_CARD_INDEX) || 0,
        cards: <ICard[]>[
            { title: '人數', price: [5403, 15634, 1258, 1354, 1584, 6424, 851], icon: 'People', totaltle: '總人數', total: 897645612, unit: '人' },
            { title: '銷售額', price: [78378, 423, 1214, 83885, 12387, 5873, 1225], icon: 'IncomeOne', totaltle: '總銷售額', total: 214240, unit: '元' },
            { title: '訂單數', price: [85353, 1235, 3586, 345, 13857, 535, 233], icon: 'Transaction', totaltle: '總訂單數', total: 8342312, unit: '個' },
            { title: '評論數', price: [2387, 53897, 2343, 5387, 453, 2333, 33321], icon: 'Comments', totaltle: '總評論數', total: 105773, unit: '則' },
        ]
    }),
    getters: {
        echart1: (state) => {
            return {
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        dimension: 0,
                        min: 0,
                        max: 7
                    }
                ],
                title: {
                    text: `${state.cards[state.cardIndex].totaltle} :${window.innerWidth < 500 ? '\n' : ''} ${state.cards[state.cardIndex].total} ${state.cards[state.cardIndex].unit}`,
                    textStyle: {
                        color: '#576574'
                    }
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    data: ['一', '二', '三', '四', '五', '六', '日'],
                },
                yAxis: {},
                series: [
                    {
                        name: state.cards[state.cardIndex].title,
                        type: 'line',
                        data: state.cards[state.cardIndex].price,
                        markLine: {
                            data: [{ type: 'average', name: 'Avg' }]
                        },
                    },
                ],

            }
        },
    },
    actions: {
    },
})
