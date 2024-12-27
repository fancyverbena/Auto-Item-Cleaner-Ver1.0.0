import { world, system } from "@minecraft/server";

// 設定（300秒 = 5分ごとに削除）
const CLEANUP_INTERVAL = 300;
let timer = 0;

system.runInterval(() => {
    timer++;
    
    if (timer >= CLEANUP_INTERVAL) {
        let itemsRemoved = 0;
        
        // ワールド内のすべてのアイテムエンティティを取得
        for (const item of world.getDimension("overworld").getEntities({ type: "item" })) {
            itemsRemoved++;
            item.kill();
        }
        
        if (itemsRemoved > 0) {
            // メッセージ送信（赤色で表示）
            world.sendMessage({
                "rawtext": [
                    {
                        "text": "§c[Item Cleaner] ",
                    },
                    {
                        "text": `Removed ${itemsRemoved} items from the ground!`
                    }
                ]
            });
            
            // 削除時の効果音を再生
            for (const player of world.getAllPlayers()) {
                player.playSound("random.orb", {
                    pitch: 1.0,
                    volume: 1.0
                });
            }
        }
        
        timer = 0;
    }
}, 20);