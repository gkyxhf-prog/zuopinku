// 作品数据管理文件
// 所有作品数据集中管理，新增作品只需复制一段数据即可
// 图片文件统一放在 images 文件夹下，每个作品一个独立文件夹

const projects = [
    {
        // 作品唯一标识（不能重复）
        id: 'character01',
        // 作品名称
        title: '魔法师蕾',
        // 作品分类：character(角色)、scene(场景)、prop(道具)
        category: 'character',
        // 封面图片路径
        cover: 'images/character01/cover.jpg',
        // 展示图片列表
        images: [
            'images/character01/view01.jpg',
            
        ],
        // 视频列表（可选）
        videos: [
            {
                name: '角色展示视频',
                url: 'images/character01/videos/showcase.mp4',
                thumbnail: 'images/character01/videos/thumbnail.jpg'
            }
        ],
        // 使用软件
        software: 'MAYA，MAX，UE，SP，ZBrush',
        // 制作时间
        date: '2026年3月',
        // 作品介绍
        description: '这是一个自己设计的角色，采用PBR材质制作。角色设计灵感来自中世纪，设定是非现实存在的异域国度，偏酷姐姐类型。模型包含完整的UV展开和贴图，可直接用于游戏引擎。'
    },
    {
        id: 'character02',
        title: 'MAI',
        category: 'character',
        cover: 'images/character02/cover.jpg',
        images: [
            'images/character02/view01.jpg',
            'images/character02/view07.jpg',
        ],
        // 视频列表（可选，此作品没有视频则为空数组）
        videos: [],
        software: 'MAYA，MAX，UE，SP，ZBrush',
        date: '2023年',
        description: '魔法厨师，风格活泼可爱，武器是擀面杖，背包装满了食材。使用ZBrush雕刻高模细节，Maya进行拓扑。'
    },
    {
        id: 'character03',
        title: 'FEI',
        category: 'character',
        cover: 'images/character03/cover.jpg',
        images: [
           
        ],
        // 视频列表（可选，此作品没有视频则为空数组）
        videos: [],
        software: 'MAYA，MAX，UE，SP，ZBrush',
        date: '2023年',
        description: '战士，风格酷姐，武器是杖。使用ZBrush雕刻高模细节，Maya进行拓扑。'
    },
    {
        id: 'prop01',
        title: '麦的包',
        category: 'prop',
        cover: 'images/prop01/cover.jpg',
        images: [
            
        ],
        // 视频列表（可选，此作品没有视频则为空数组）
        videos: [],
        software: 'MAYA，MAX，UE，SP，ZBrush',
        date: '2023年',
        description: '魔法厨师，风格活泼可爱，武器是擀面杖，背包装满了食材。使用ZBrush雕刻高模细节，Maya进行拓扑。'
    },

   {
        id: 'prop02',
        title: '麦的武器',
        category: 'prop',
        cover: 'images/prop02/cover.jpg',
        images: [
            
            
        ],
        // 视频列表（可选，此作品没有视频则为空数组）
        videos: [],
        software: 'MAYA，MAX，UE，SP，ZBrush',
        date: '2023年',
        description: '魔法厨师，风格活泼可爱，武器是擀面杖，背包装满了食材。使用ZBrush雕刻高模细节，Maya进行拓扑。'
    },
   {
        id: 'prop03',
        title: '木杖',
        category: 'prop',
        cover: 'images/prop03/cover.jpg',
        images: [
            'images/prop03/view01.jpg',
            
        ],
        // 视频列表（可选，此作品没有视频则为空数组）
        videos: [],
        software: 'MAYA，MAX，UE，SP，ZBrush',
        date: '2026年',
        description: '魔法师法杖，同时很沉重，可以锻炼臂力。使用ZBrush雕刻高模细节，Maya进行拓扑。'
    },
];

// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projects;
}