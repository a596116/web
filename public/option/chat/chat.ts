export const chat = [
    // { "msgs": ["普通消息"], "msgInputSpeed": 80 },
    // {
    //     "msgs": ["普通消息会回退", "普通消息回退后的结果，也能调整动画速度"],
    //     "msgInputSpeed": 80
    // },
    // {
    //     "msgs": ["支持切换输入角色"],
    //     "msgInputSpeed": 80,
    //     "author": "me"
    // },
    // {
    //     "msgs": ["<span style=\"color: red;\">红色的span标签字体</span>"],
    //     "msgInputSpeed": 80
    // },
    // {
    //     "msgs": [
    //         "消息支持触发用户输入交互，本条消息用户输入包括[好]才能进入下一步，多次将强行跳过"
    //     ],
    //     "msgInputSpeed": 80,
    //     "triggerNextAction": {
    //         "type": "userInput",
    //         "options": {
    //             "resolveKeyTexts": ["好"],
    //             "rejectKeyTexts": [],
    //             "rejectHitTexts": ["输入好，听不懂吗？？？", "触发强行跳过"]
    //         }
    //     }
    // },
    // { "msgs": ["<img src='/img/logo.png'/>"] },
    // {
    //     "msgs": ["<vlog src='/img/test.mp4'/>"],
    //     "triggerNextAction": { "type": "componentClose" }
    // },
    {
        "msgs": ["<letter src='/letters/test.json'/>"],
        "triggerNextAction": { "type": "componentClose" }
    },
    // { "msgs": ["接下来是一些通用测试"], "msgInputSpeed": 80 },
    // {
    //     "msgs": ["有些心里话，你想听吗？"],
    //     "msgInputSpeed": 40,
    //     "triggerNextAction": {
    //         "type": "userInput",
    //         "options": {
    //             "resolveKeyTexts": [
    //                 "好的",
    //                 "可以",
    //                 "同意",
    //                 "願意",
    //                 "想",
    //                 "想聽",
    //                 "是"
    //             ],
    //             "rejectKeyTexts": ["不想", "不", "不要", "不聽"],
    //             "rejectHitTexts": [
    //                 "不听？信不信我分分钟出 bug 给你看？",
    //                 "好吧，既然你实在不想听，那我就讲给你听吧～"
    //             ]
    //         }
    //     }
    // },
    // { "msgs": ["心里话都在这封信里"], "msgInputSpeed": 80 },
    // {
    //     "msgs": ["<letter src='/letters/test.json'/>"],
    //     "triggerNextAction": { "type": "componentClose" }
    // },
    {
        "msgs": ["你猜我在想什么？"],
        "msgInputSpeed": 80,
        "triggerNextAction": {
            "type": "userInput",
            "options": {
                "resolveKeyTexts": ["想我", "我"],
                "rejectKeyTexts": ["不知道", "不", "不知"],
                "rejectHitTexts": [
                    "你猜错了～",
                    ["给你提示一下～", "是个人~"],
                    "这都猜不中？？？",
                    ["好吧，看图吧。", "<img src='/img/logo.png'>"]
                ]
            }
        }
    },
    { "msgs": ["我是在想打游戏", "我是在想你呢"], "msgInputSpeed": 80 },
    { "msgs": ["看看这个视频"], "msgInputSpeed": 80 },
    {
        "msgs": ["<vlog src='/img/test.mp4'/>"],
        "triggerNextAction": { "type": "componentClose" }
    },
    {
        "msgs": ["测试结束，广告位招租"],
        "msgInputSpeed": 80
    }
]
