# 更新日志
###  Bug修复与更改  
> 更改
1. 更改“/book”的判断方式
2. 更改“/info”的判断方式
3. 更改“/copyright”的判断方式
4. 更改加载界面“Mojang Studio”的标题文本
5. 更改主界面的MC标题
6. 新增“/robot”指令和格式，用于操作整合包里的部分功能的使用
7. 新增“/cleartime”指令和格式，用于调整自动清理的启动时间
8. 新增可能会“出现卡岩的进度条”功能
9. 优化指令布局
10. ~~加入“/pos”指令及格式~~[已弃用](https://redstone233-git.netlify.app/title/modpack.html)
 
> 修复
1. 修复“/book”指令的部分问题
2. 修复“/info”指令的部分问题
3. 修复“/copyright”指令的部分问题
3. 修复流体用途无法在REI里显示的问题
4. 修复自定义方块没有掉落物的问题
5. 修复自定义物品无法合成的问题
6. 修复部分bug
7. 修复附魔苹果有时合成失败的问题

### 龙的冒险：永恒机械·重铸2.0
V2版本将会是一个大更新，增加更多功能，同时又修复部分bug。


> 联系方式  

  - 企鹅号：3356168312  
  - 微信号：RTX-Redstone233  
  - [爱发电](https://afdian.net/a/Redstone2337200)  
  - [个人主页](https://redstone233-git.netlify.app/)  


>> 其他方式  

  - [Fanbook](https://in.fanbook.cn/DgmKNFI9)  
  - [QQ频道](https://pd.qq.com/s/dtkcsazwi)  
  - [QQ群聊](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=NmAWkposErlK8OltMZJ6KI_Oqr7Om4JO&authKey=a4I%2B%2FPQnVgm4jJPRiebDWlGHCPX%2B3a8Ha0Ogt4eF3MEGa1j8FN9gKmfLptT7KYH1&noverify=0&group_code=718229409)


### 龙的冒险：永恒机械·重铸系列
> 普通系列  
>> 官方魔改整合V1.1.2.2  

  - 龙的冒险：应用科技V1.1.2.0  
  - 龙的冒险：应用科技V1.1.2.1  
  - [龙的冒险：应用科技V1.1.2.2](https://www.123pan.com/s/hSr9-q7m5d.html)


>> 机械动力分支V1系列  

  - 龙的冒险：永恒机械·重铸V1.0.0  
  - 龙的冒险：永恒机械·重铸V1.0.1  
  - 龙的冒险：永恒机械·重铸V1.0.2  
  - 龙的冒险：永恒机械·重铸V1.0.3  
  - 龙的冒险：永恒机械·重铸V1.0.4  
  - 龙的冒险：永恒机械·重铸V1.0.5  
  - 龙的冒险：永恒机械·重铸V1.0.5-fixed  
  - 龙的冒险：永恒机械·重铸V1.0.6  
  - 龙的冒险：永恒机械·重铸V1.0.7  
  - [龙的冒险：永恒机械·重铸V1.0.8](https://www.123pan.com/s/hSr9-L7m5d.html)


>> 机械动力分支V2系列  

  - 龙的冒险：永恒机械·重铸2.0V2.0.0  
  - 龙的冒险：永恒机械·重铸2.0V2.0.1 
  - 龙的冒险：永恒机械·重铸2.0V2.0.2
  - 龙的冒险：永恒机械·重铸2.0V2.0.3
  - [龙的冒险：永恒机械·重铸2.0V2.0.3-fixed](https://www.123pan.com/s/hSr9-fcm5d.html)

### 建模工具
[建模工具](https://web.blockbench.net/)

### 代码片段
这段代码用于自定义指令，但你想做到彻底的自定义之命，有Java编程基础，之后写模组才能实现彻底的自定义命令。
```js
onEvent("command.registry", event => {
 // 这里写自定义指令的代码片段
})
```

### 代码完整片段
代码完整片段V1.18.2
```js
onEvent("command.registry", event => {//监听命令注册事件
    const { commands: Commands, arguments: Arguments} = event;
    event.register(// 注册新命令
        Commands.literal("myCommand")// 命令名称为myCommand
        .requires(src => src.hasPermission(2))//2代表权限需求为管理员权限，该行可以省略。你还可以将其扩写并使用return关键字来实现更加复杂的权限检查。
        .then(Commands.argument('arg1', Arguments.STRING.create(event))// 添加字符串类型参数arg1，你可以添加任何数量的参数。
            .then(Commands.argument('arg2', Arguments.FLOAT.create(event))// 添加字符串类型参数arg2，你可以添加任何数量的参数。其他类型详见ProbeJS提供的代码提示。
                .executes(ctx => {// 执行命令时执行以下内容
                    const arg1 = Arguments.STRING.getResult(ctx, "arg1");// 获取arg1的值
                    const arg2 = Arguments.FLOAT.getResult(ctx, "arg2");// 获取arg2的值
                    if(arg1 == "example")
                        return 0;// 当arg1的值为"example"时跳出函数。返回0代表命令不生效。
                    let level = ctx.source.level.asKJS() // 获取当前level
                    let position = ctx.source.position // 获取当前position
                    // 对范围内实体造成伤害
                    let i = 0 // 伤害计数器
                    level.getEntitiesWithin(AABB.of(position.x()-2,position.y()-2,position.z()-2,position.x()+2,position.y()+2,position.z()+2)).forEach(entity => {// 获取当前position，4*4*4范围内的实体
                        if (entity.living) {
                          // 伤害实体，计数器+1
                          // 伤害值为arg2的数值
                          entity.attack(arg2)
                          i++
                          // 如果实体类型为玩家则告知其arg1的值
                          if (entity.type == "minecraft:player") entity.tell(arg1) 
                        }
                    })
                    return i // 返回计数器
                })
            )
        )
    )
})
```

### 代码片段
注册指令“/book”的1.18.2完整格式
```js
onEvent("command.registry", event => {
    const {
        commands: Commands,
        arguments: Arguments
    } = event;
    event.register(
        Commands.literal("book")
            .requires(src => src.hasPermission(2))
            .then(Commands.argument('target', Arguments.PLAYER.create(event))
                .then(Commands.argument('book|info', Arguments.STRING.create(event))
                    .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
                        .executes(run => {
                            const target = Arguments.PLAYER.getResult(run, "target");
                            const type = Arguments.STRING.getResult(run, "book|info");
                            const bool = Arguments.BOOLEAN.getResult(run, "bool");
                            let types = ["book","info"]
                            let player = event.player
                            target = player
                            if (type == null && bool == false) {
                                event.server.tell(Text.red('执行失败！').bold())
                            } else if (target == player && type == types[0] && bool == true) {
                                event.server.tell(Text.green('执行成功！').bold())
                                event.server.runCommand(`/execute as @p at @s run function vanilla_pack:book`)
                            } else if (target == player && type == types[1] && bool == true) {
                                event.server.tell([Text.green('===============介绍===============').bold()]);
                                event.server.tell([Text.green('龙的冒险：永恒机械·重铸2.0整合包').bold()]);
                                event.server.runCommandSilent('tellraw @p [{"text":"§a§l尊敬的冒险家","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"selector":"@p","bold":true,"color":"yellow"},{"text":"§a§l先生,"}]');
                                event.server.tell([Text.green('在这个充满龙的世界中,玩家可以选择当龙骑士耀武扬威,\n也可以选择化身为龙,体验龙的生活,\n玩家还可以选择发展科技实现自动化工厂,\n还能以枪为武器,大战巨龙,成为猎龙人,\n这是一个未知的世界,在这个世界,活下去吧！').bold()]);
                                event.server.runCommandSilent('tellraw @a [{"text":"§a§lV2.0.2 Powered by ","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"text":"§a§lRedstone233","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"clickEvent":{"action":"open_url","value":"https://redstone233-git.netlify.app/"},"hoverEvent":{"action":"show_text","value":"Click here to enter."}}]');
                                event.server.tell([Text.green('Copyright ©2024 Felongkeji™.').bold()]);
                                event.server.tell([Text.green('===============介绍===============').bold()]);
                            }
                        }
                        )
                    )
                )
            )
    )
})
```

### 代码片段
注册指令“/copyright”的1.18.2完整代码
```js
onEvent("command.registry", event => {
    const {
        commands: Commands,
        arguments: Arguments
    } = event;
    event.register(
        Commands.literal("copyright")
            .requires(src => src.hasPermission(1))
            .then(Commands.argument('target', Arguments.PLAYER.create(event))
                .then(Commands.argument('item', Arguments.ITEM_STACK.create(event))
                    .then(Commands.argument('count', Arguments.INTEGER.create(event))
                        .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
                            .executes(run => {
                                const target = Arguments.PLAYER.getResult(run, "target");
                                const item = Arguments.ITEM_STACK.getResult(run, "item");
                                const count = Arguments.INTEGER.getResult(run, "count");
                                const bool = Arguments.BOOLEAN.getResult(run, "bool");
                                if (target == event.player && item == undefined && count == null && bool == false) {
                                    event.server.tell(Text.red('执行失败，可能是参数不全').bold())
                                } else if (target == event.player && item != undefined && count <= 1 && bool == true) {
                                    event.player.give(`${item}`)
                                    event.server.tell(Text.green(`执行成功，成功将${item}*1给予玩家${event.player}`).bold())
                                } else if (target == event.player && item != undefined && count <= 2 && bool == true) {
                                    event.player.give(`${count}x ${item}`)
                                    event.server.tell(Text.green(`执行成功！成功将${item}*${count}给予玩家${event.player}`).bold())
                                }
                            }
                            )
                        )
                    )
                )
            )
    )
})
```

### 代码片段
注册“/info”指令1.18.2完整片段
```js
onEvent("command.registry", event => {
    const {
        commands: Commands,
        arguments: Arguments
    } = event;
    event.register(
        Commands.literal("info")
            .requires(src => src.hasPermission(1))
            .then(Commands.argument('target', Arguments.PLAYER.create(event))
                .then(Commands.argument('version|help|name|description', Arguments.STRING.create(event))
                    .then(Commands.argument('bool', Arguments.BOOLEAN.create(event))
                        .executes(run => {
                            const target = Arguments.PLAYER.getResult(run, "target");
                            const type = Arguments.STRING.getResult(run, "version|help|name|description");
                            const bool = Arguments.BOOLEAN.getResult(run, "bool");
                            let types = ["version", "help", "name", "description"]
                            let player = event.player
                            target = player
                            if (target == player && type == null && bool == false) {
                                event.server.tell(Text.red('执行失败！').bold())
                            } else if (target == player && type == types[0] && bool == true) {
                                event.server.tell(Text.green('执行成功！').bold())
                                //event.server.tell([Text.green('===============介绍===============').bold()]);
                                //event.server.tell([Text.green('龙的冒险：永恒机械·重铸2.0整合包').bold()]);
                                //event.server.runCommandSilent('tellraw @p [{"text":"§a§l尊敬的冒险家","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"selector":"@p","bold":true,"color":"yellow"},{"text":"§a§l先生,"}]');
                                //event.server.tell([Text.green('在这个充满龙的世界中,玩家可以选择当龙骑士耀武扬威,\n也可以选择化身为龙,体验龙的生活,\n玩家还可以选择发展科技实现自动化工厂,\n还能以枪为武器,大战巨龙,成为猎龙人,\n这是一个未知的世界,在这个世界,活下去吧！').bold()]);
                                event.server.runCommandSilent('tellraw @p [{"text":"§a§lV2.0.2 Powered by ","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"text":"§a§lRedstone233","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"clickEvent":{"action":"open_url","value":"https://redstone233-git.netlify.app/"},"hoverEvent":{"action":"show_text","value":"Click here to enter."}}]');
                                event.server.tell([Text.green('Copyright ©2024 Felongkeji™.').bold()]);
                                //event.server.tell([Text.green('===============介绍===============').bold()]);
                            } else if (target == player && type == types[1] && bool == true) {
                                event.server.tell(Text.green('执行成功！').bold())
                                //event.server.tell([Text.green('===============介绍===============').bold()]);
                                event.server.tell([Text.green('龙的冒险：永恒机械·重铸2.0整合包').bold()]);
                                //event.server.runCommandSilent('tellraw @p [{"text":"§a§l尊敬的冒险家","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"selector":"@p","bold":true,"color":"yellow"},{"text":"§a§l先生,"}]');
                                //event.server.tell([Text.green('在这个充满龙的世界中,玩家可以选择当龙骑士耀武扬威,\n也可以选择化身为龙,体验龙的生活,\n玩家还可以选择发展科技实现自动化工厂,\n还能以枪为武器,大战巨龙,成为猎龙人,\n这是一个未知的世界,在这个世界,活下去吧！').bold()]);
                                //event.server.runCommandSilent('tellraw @p [{"text":"§a§lV2.0.0 Powered by ","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"text":"§a§lRedstone233","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"clickEvent":{"action":"open_url","value":"https://redstone233-git.netlify.app/"},"hoverEvent":{"action":"show_text","value":"Click here to enter."}}]');
                                event.server.tell([Text.green('Copyright ©2024 Felongkeji™.').bold()]);
                                //event.server.tell([Text.green('===============介绍===============').bold()]);
                            } else if (target == player && type == types[2] && bool == true) {
                                event.server.tell(Text.green('执行成功！').bold())
                                event.server.tell([Text.green('===============介绍===============').bold()]);
                                event.server.tell([Text.green('龙的冒险：永恒机械·重铸2.0整合包').bold()]);
                                event.server.runCommandSilent('tellraw @p [{"text":"§a§l尊敬的冒险家","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"selector":"@p","bold":true,"color":"yellow"},{"text":"§a§l先生,"}]');
                                event.server.tell([Text.green('在这个充满龙的世界中,玩家可以选择当龙骑士耀武扬威,\n也可以选择化身为龙,体验龙的生活,\n玩家还可以选择发展科技实现自动化工厂,\n还能以枪为武器,大战巨龙,成为猎龙人,\n这是一个未知的世界,在这个世界,活下去吧！').bold()]);
                                event.server.runCommandSilent('tellraw @p [{"text":"§a§lV2.0.2 Powered by ","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false},{"text":"§a§lRedstone233","bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"clickEvent":{"action":"open_url","value":"https://redstone233-git.netlify.app/"},"hoverEvent":{"action":"show_text","value":"Click here to enter."}}]');
                                event.server.tell([Text.green('Copyright ©2024 Felongkeji™.').bold()]);
                                event.server.tell([Text.green('===============介绍===============').bold()]);
                            } else if (target == player && type == types[3] && bool == true) {
                                event.server.tell(Text.green('================格式===============').bold());
                                event.server.tell(Text.green('/book <玩家选择器> <书本类型>¹ <布尔值>').bold());
                                event.server.tell(Text.green('/info <玩家选择器> <信息类型>² <布尔值>').bold());
                                event.server.tell(Text.green('/copyright <玩家选择器> <物品ID> <获取数量> <布尔值>').bold());
                                event.server.tell(Text.green('数据类型：').bold());
                                event.server.tell([Text.green('①书本类型可为：').bold(),Text.green('\nbook和info').bold()]);
                                event.server.tell([Text.green('②信息类型可为：').bold(),Text.green('\nversion、help、name和description').bold()]);
                                event.server.tell(Text.green('================格式===============').bold())
                            }
                        }
                        )
                    )
                )
            )
    )
})
```
## 代码片段
注册“/robot”指令1.18.2的片段
```js
onEvent('command.registry', event => {
    const { commands: Commands, arguments: Arguments } = event;
    event.register(
        Commands.literal("robot")
            .requires(src => src.hasPermission(1))
            .then(Commands.argument('remind|autoclear', Arguments.STRING.create(event))
                .then(Commands.argument('bool', Arguments.BOOLEAN.create(event)))
                .executes(run => {
                    const function1 = Arguments.STRING.getResult(run, "remind|autoclear");
                    const bool = Arguments.BOOLEAN.getResult(run, "bool");
                    let type = ["remind", "autoclear"]
                    if (function1 == null || function1 == undefined && bool == false || bool == true) {
                        event.server.tell(Text.red('执行失败！').bold())
                    } else if (function1 == type[0] && bool == true) {
                        event.server.getPlayer().stages.add('on')
                        event.server.tell(Text.green('执行成功！').bold())
                    } else if (function1 == type[0] && bool == false) {
                        event.server.getPlayer().stages.remove('on')
                        event.server.tell(Text.green('执行失败！').bold())
                    } else if (function1 == type[1] && bool == true) {
                        event.server.getPlayer().stages.add('time')
                        event.server.tell(Text.green('执行成功！').bold())
                    } else if (function1 == type[1] && bool == false) {
                        event.server.getPlayer().stages.remove('time')
                        event.server.tell(Text.green('执行失败！').bold())
                    }
                }
            )
        )
    )
})
```
### 代码片段
注册“/cleartime”指令1.18.2代码片段
```js
onEvent('command.registry', event => {
    const { commands: Commands, arguments: Arguments } = event;
    event.register(
        Commands.literal("cleartime")
            .requires(src => src.hasPermission(1))
            .then(Commands.argument('time', Arguments.INTEGER.create(event))
                .then(Commands.argument('bool', Arguments.BOOLEAN.create(event)))
                .executes(run => {
                    const time = Arguments.INTEGER.getResult(run, "time");
                    const bool = Arguments.BOOLEAN.getResult(run, "bool");
                    if (time <= 0 && bool == false || bool == true) {
                        event.server.tell(Text.red('执行失败！').bold())
                    } else if (time >= 1 && time <= 120 && bool == true) {
                        let score = time * 60
                        event.server.runCommandSilent(`/scoreboard players set item time ${score}`)
                        event.server.tell(Text.green(`执行成功！已将时间设定为${score}`).bold())
                    } else if (time >= 121 && bool == true) {
                        event.server.tell([Text.red(`执行失败！您设定的时间${score}太大了，超过了1~120的范围。`).bold()])    
                    }
                }
            )
        )
    )
})
```

### 代码片段
注册冰火传说龙钢锻炉制作的思索动画
#### 要先注册标签才能使用(tag)
```js
onEvent('ponder.tag', event => {
//龙炎锻炉
    event.createTag('kubejs:dragonforge_fire_make','iceandfire:dragonforge_fire_core_disabled',"龙炎锻炉","如何制作一个龙炎锻炉", [
        "iceandfire:dragonforge_fire_brick",
        "iceandfire:dragon_bone_block",
        "iceandfire:dragonforge_fire_core_disabled",
        "iceandfire:dragonforge_fire_input"
    ]);
    //龙霜锻炉
    event.createTag('kubejs:dragonforge_ice_make','iceandfire:dragonforge_ice_core_disabled',"龙霜锻炉","如何制作一个龙霜锻炉", [
        "iceandfire:dragonforge_ice_brick",
        "iceandfire:dragon_bone_block",
        "iceandfire:dragonforge_ice_core_disabled",
        "iceandfire:dragonforge_ice_input"
    ]);
    //龙霆锻炉
    event.createTag('kubejs:dragonforge_lightning_make','iceandfire:dragonforge_lightning_core_disabled',"龙霆锻炉","如何制作一个龙霆锻炉", [
        "iceandfire:dragonforge_lightning_brick",
        "iceandfire:dragon_bone_block",
        "iceandfire:dragonforge_lightning_core_disabled",
        "iceandfire:dragonforge_lightning_input"
    ]);
});
```
###### 一条线走到黑版本(1.18.2)
```js
onEvent('ponder.registry', event => {
    event.create('iceandfire:dragonforge_fire_core_disabled')
        //龙炎锻炉
        .scene(
            'dragonforge_fire',
            '制作一个龙炎锻炉',
            (scene, util) => {
                scene.showStructure()
                scene.idle(20)
                //辅助类:设置龙骨块
                const setDragonBoneBlocks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragon_bone_block'));
                }
                //辅助类：设置火锻炉砖块
                const setForgeFireBricks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragonforge_fire_brick'));
                }


                //第1层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 1, 3], [1, 1, 3], [3, 1, 1], [1, 1, 1]
                ])
                scene.text(20, "首先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgeFireBricks([
                    [2, 1, 3], [3, 1, 2], [2, 1, 2], 
                    [1, 1, 2], [2, 1, 1]
                ])
                scene.overlay.showOutline('green', {}, [3, 1, 3, 1, 1, 1], 20)
                scene.text(20, "然后其他地方分别填上龙炎锻炉砖块")
                scene.idle(40)
                //第2层
                scene.addKeyframe()
                scene.text(40, "然后这里用龙炎锻炉砖块围起来")
                .attachKeyFrame()
                //显示每一块
                let bricks = [
                    [3, 2, 3], [2, 2, 3], [1, 2, 3],
                    [3, 2, 2], [1, 2, 2], [3, 2, 1],
                    [1, 2, 1]
                ]
                setForgeFireBricks([
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ])
                for (let brick of bricks) {
                    scene.world.showSection(brick, Direction.DOWN)
                    scene.idle(5)
                }
                //最后一块
                let final = scene.world.showIndependentSection([3, 2, 2], Direction.DOWN)
                scene.world.moveSection(final, [0, -1, 0], 0)
                scene.idle(10)
                var table = util.select.fromTo(2, 2, 2, 2, 2, 2)
                var table4 = util.select.fromTo(2, 2, 1, 2, 2, 1)
                scene.world.setBlocks([2, 2, 2], 'iceandfire:dragonforge_fire_core_disabled')
                                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table4, 20);
                scene.text(30, "龙炎锻炉核心", [2.5, 3.0, 2.0])
                    .colored(PonderPalette.GREEN);
                scene.idle(30)
                scene.world.setBlocks([2, 2, 1], 'iceandfire:dragonforge_fire_input')
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table, 20);
                scene.text(30, "龙炎锻炉焰口", [2.5, 3.0, 1.0])
                    .colored(PonderPalette.GREEN);
                scene.idle(30)
                scene.text(40, "然后在中间放龙炎锻炉核心，外边放龙炎锻炉焰孔")
                scene.idle(40)
                //第3层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 3, 3], [1, 3, 3], 
                    [3, 3, 1], [1, 3, 1]
                ])
                scene.text(20, "和第1层一样，先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgeFireBricks([
                    [2, 3, 3], [3, 3, 2], [2, 3, 2], 
                    [1, 3, 2], [2, 3, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙炎锻炉砖块")
                scene.idle(40)
                //替换
                scene.world.modifyBlock([2, 2, 2], () => Block.id('iceandfire:dragonforge_fire_core'), true)
                scene.world.setBlocks([1, 2, 2], Block.id('iceandfire:dragonforge_fire_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([2, 2, 3], Block.id('iceandfire:dragonforge_fire_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([3, 2, 2], Block.id('iceandfire:dragonforge_fire_brick')
                    .with('grill', 'true'), true)
            })
        //龙霜锻炉
        .scene(
            'dragonforge_ice',
            '制作一个龙霜锻炉',
            (scene, util) => {
                scene.showStructure()
                scene.idle(20)
                //辅助类:设置龙骨块
                const setDragonBoneBlocks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragon_bone_block'));
                }
                //辅助类：设置火锻炉砖块
                const setForgelceBricks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragonforge_ice_brick'));
                }


                //第1层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 1, 3], [1, 1, 3], [3, 1, 1], [1, 1, 1]
                ])
                scene.text(20, "首先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelceBricks([
                    [2, 1, 3], [3, 1, 2], [2, 1, 2], [1, 1, 2], [2, 1, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霜锻炉砖块")
                scene.overlay.showOutline('green', {}, [3, 1, 3, 1, 1, 1], 20)
                scene.idle(40)
                //第2层
                scene.addKeyframe()
                scene.text(40, "然后这里用龙霜锻炉砖块围起来")
                
                     .attachKeyFrame()
                //显示每一块
                let bricks = [
                    [3, 2, 3], [2, 2, 3], [1, 2, 3],
                    [3, 2, 2], [1, 2, 2], [3, 2, 1],
                    [1, 2, 1]
                ]
                setForgelceBricks([
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ])
                for (let brick of bricks) {
                    scene.world.showSection(brick, Direction.DOWN)
                    scene.idle(5)
                }
                //最后一块
                let final = scene.world.showIndependentSection([3, 2, 2], Direction.DOWN)
                scene.world.moveSection(final, [0, -1, 0], 0)
                scene.idle(10)
                var table5 = util.select.fromTo(2, 2, 2, 2, 2, 2)
                var table6 = util.select.fromTo(2, 2, 1, 2, 2, 1)
                scene.world.setBlocks([2, 2, 2], 'iceandfire:dragonforge_ice_core_disabled')
                scene.text(30, "龙霜锻炉核心", [2.5, 3.0, 2.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table5, 20);
                scene.idle(30)
                scene.world.setBlocks([2, 2, 1], 'iceandfire:dragonforge_ice_input')
                scene.text(30, "龙霜锻炉焰口", [2.5, 3.0, 1.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table6, 20);
                scene.idle(30)
                scene.text(40, "然后在中间放龙霜锻炉核心，外边放龙霜锻炉焰孔")
                scene.idle(40)
                //第3层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 3, 3], [1, 3, 3], [3, 3, 1], [1, 3, 1]
                ])
                scene.text(20, "和第1层一样，先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelceBricks([
                    [2, 3, 3], [3, 3, 2], [2, 3, 2], [1, 3, 2], [2, 3, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霜锻炉砖块")
                scene.idle(40)
                //替换
                scene.world.modifyBlock([2, 2, 2], () => Block.id('iceandfire:dragonforge_ice_core'), true)
                scene.world.setBlocks([1, 2, 2], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([2, 2, 3], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([3, 2, 2], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
            })
        //龙霆锻炉
        .scene(
            'dragonforge_lightning',
            '制作一个龙霆锻炉',
            (scene, util) => {
                scene.showStructure()
                scene.idle(20)
                //辅助类:设置龙骨块
                const setDragonBoneBlocks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragon_bone_block'));
                }
                //辅助类：设置火锻炉砖块
                const setForgelightningBricks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragonforge_lightning_brick'));
                }


                //第1层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 1, 3], [1, 1, 3], [3, 1, 1], [1, 1, 1]
                ])
                scene.text(20, "首先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelightningBricks([
                    [2, 1, 3], [3, 1, 2], [2, 1, 2], [1, 1, 2], [2, 1, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霆锻炉砖块")
                scene.overlay.showOutline('green', {}, [3, 1, 3, 1, 1, 1], 20)
                scene.idle(40)
                //第2层
                scene.addKeyframe()
                scene.text(40, "然后这里用龙霆锻炉砖块围起来")
                
                    .attachKeyFrame()
                //显示每一块
                let bricks = [
                    [3, 2, 3], [2, 2, 3], [1, 2, 3],
                    [3, 2, 2], [1, 2, 2], [3, 2, 1],
                    [1, 2, 1]
                ]
                setForgelightningBricks([
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ])
                for (let brick of bricks) {
                    scene.world.showSection(brick, Direction.DOWN)
                    scene.idle(5)
                }
                //最后一块
                let final = scene.world.showIndependentSection([3, 2, 2], Direction.DOWN)
                scene.world.moveSection(final, [0, -1, 0], 0)
                scene.idle(10)
                var table7 = util.select.fromTo(2, 2, 2, 2, 2, 2)
                var table8 = util.select.fromTo(2, 2, 1, 2, 2, 1)
                scene.world.setBlocks([2, 2, 2], 'iceandfire:dragonforge_lightning_core_disabled')
                scene.text(30, "龙霆锻炉核心", [2.5, 3.0, 2.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table7, 20);
                scene.idle(30)
                scene.world.setBlocks([2, 2, 1], 'iceandfire:dragonforge_lightning_input')
                scene.text(30, "龙霆锻炉焰口", [2.5, 3.0, 1.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table8, 20);
                scene.idle(30)
                scene.text(40, "然后在中间放龙霆锻炉核心，外边放龙霆锻炉焰孔")
                scene.idle(40)
                //第3层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 3, 3], [1, 3, 3], [3, 3, 1], [1, 3, 1]
                ])
                scene.text(20, "和第1层一样，先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelightningBricks([
                    [2, 3, 3], [3, 3, 2], [2, 3, 2], [1, 3, 2], [2, 3, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霆锻炉砖块")
                scene.idle(40)
                //替换
                scene.world.modifyBlock([2, 2, 2], () => Block.id('iceandfire:dragonforge_lightning_core'), true)
                scene.world.setBlocks([1, 2, 2], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([2, 2, 3], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([3, 2, 2], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
            })
})
```

###### 两条线独立版本(1.18.2)
```js
onEvent('ponder.registry', event => {
    event
        .create('iceandfire:dragonforge_ice_core_disabled')
        .scene(
            'dragonforge_ice',
            '制作一个龙霜锻炉',
            (scene, util) => {
                scene.showStructure()
                scene.idle(20)
                //辅助类:设置龙骨块
                const setDragonBoneBlocks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragon_bone_block'));
                }
                //辅助类：设置龙霜锻炉砖块
                const setForgelceBricks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragonforge_ice_brick'));
                }


                //第1层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 1, 3], [1, 1, 3], 
                    [3, 1, 1], [1, 1, 1]
                ])
                scene.text(20, "首先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelceBricks([
                    [2, 1, 3], [3, 1, 2], [2, 1, 2], 
                    [1, 1, 2], [2, 1, 1]
                ])
                    scene.overlay.showOutline('green', {}, [3, 1, 3, 1, 1, 1], 20)
                scene.text(20, "然后其他地方分别填上龙霜锻炉砖块")
                scene.idle(40)
                //第2层
                scene.addKeyframe()
                scene.text(40, "然后这里用龙霜锻炉砖块围起来")
                    .attachKeyFrame()
                //显示每一块
                let bricks = [
                    [3, 2, 3], [2, 2, 3], [1, 2, 3],
                    [3, 2, 2], [1, 2, 2], [3, 2, 1],
                    [1, 2, 1]
                ]
                setForgelceBricks([
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ])
                for (let brick of bricks) {
                    scene.world.showSection(brick, Direction.DOWN)
                    scene.idle(5)
                }
                //最后一块
                let final = scene.world.showIndependentSection([3, 2, 2], Direction.DOWN)
                scene.world.moveSection(final, [0, -1, 0], 0)
                scene.idle(10)
                var table5 = util.select.fromTo(2, 2, 2, 2, 2, 2)
                var table6 = util.select.fromTo(2, 2, 1, 2, 2, 1)
                scene.world.setBlocks([2, 2, 2], 'iceandfire:dragonforge_ice_core_disabled')
                scene.text(30, "龙霜锻炉核心", [2.5, 3.0, 2.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table5, 20);
                scene.idle(30)
                scene.world.setBlocks([2, 2, 1], 'iceandfire:dragonforge_ice_input')
                scene.text(30, "龙霜锻炉焰口", [2.5, 3.0, 1.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table6, 20);
                scene.idle(30)
                scene.text(40, "然后在中间放龙霜锻炉核心，外边放龙霜锻炉焰孔")
                scene.idle(40)
                //第3层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 3, 3], [1, 3, 3], 
                    [3, 3, 1], [1, 3, 1]
                ])
                scene.text(20, "和第1层一样，先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelceBricks([
                    [2, 3, 3], [3, 3, 2], [2, 3, 2], 
                    [1, 3, 2], [2, 3, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霜锻炉砖块")
                scene.idle(40)
                //替换
                scene.world.modifyBlock([2, 2, 2], () => Block.id('iceandfire:dragonforge_ice_core'), true)
                scene.world.setBlocks([1, 2, 2], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([2, 2, 3], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([3, 2, 2], Block.id('iceandfire:dragonforge_ice_brick')
                    .with('grill', 'true'), true)
            })
    event
        .create('iceandfire:dragonforge_lightning_core_disabled')
        .scene(
            'dragonforge_lightning',
            '制作一个龙霆锻炉',
            (scene, util) => {
                scene.showStructure()
                scene.idle(20)
                //辅助类:设置龙骨块
                const setDragonBoneBlocks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragon_bone_block'));
                }
                //辅助类：设置龙霆锻炉砖块
                const setForgelightningBricks = (positions) => {
                    positions.forEach(pos => scene.world.setBlocks(pos, 'iceandfire:dragonforge_lightning_brick'));
                }


                //第1层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 1, 3], [1, 1, 3], 
                    [3, 1, 1], [1, 1, 1]
                ])
                scene.text(20, "首先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelightningBricks([
                    [2, 1, 3], [3, 1, 2], [2, 1, 2], 
                    [1, 1, 2], [2, 1, 1]
                ])
                 scene.overlay.showOutline('green', {}, [3, 1, 3, 1, 1, 1], 20)
                scene.text(20, "然后其他地方分别填上龙霆锻炉砖块")
                scene.idle(40)
                //第2层
                scene.addKeyframe()
                scene.text(40, "然后这里用龙霆锻炉砖块围起来")
                .attachKeyFrame()
                //显示每一块
                let bricks = [
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ]
                setForgelightningBricks([
                    [3, 2, 3], [2, 2, 3], [1, 2, 3], 
                    [3, 2, 2], [1, 2, 2], [3, 2, 1], 
                    [1, 2, 1]
                ])
                for (let brick of bricks) {
                    scene.world.showSection(brick, Direction.DOWN)
                    scene.idle(5)
                }
                //最后一块
                let final = scene.world.showIndependentSection([3, 2, 2], Direction.DOWN)
                scene.world.moveSection(final, [0, -1, 0], 0)
                scene.idle(10)
                var table5 = util.select.fromTo(2, 2, 2, 2, 2, 2)
                var table6 = util.select.fromTo(2, 2, 1, 2, 2, 1)
                scene.world.setBlocks([2, 2, 2], 'iceandfire:dragonforge_lightning_core_disabled')
                scene.text(30, "龙霆锻炉核心", [2.5, 3.0, 2.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table5, 20);
                scene.idle(30)
                scene.world.setBlocks([2, 2, 1], 'iceandfire:dragonforge_lightning_input')
                scene.text(30, "龙霆锻炉焰口", [2.5, 3.0, 1.0])
                    .colored(PonderPalette.GREEN);
                scene.overlay.showOutline(PonderPalette.GREEN, new Object(), table6, 20);
                scene.idle(30)
                scene.text(40, "然后在中间放龙霆锻炉核心，外边放龙霆锻炉焰孔")
                scene.idle(40)
                //第3层
                scene.addKeyframe()
                setDragonBoneBlocks([
                    [3, 3, 3], [1, 3, 3], 
                    [3, 3, 1], [1, 3, 1]
                ])
                scene.text(20, "和第1层一样，先在4个角分别放上龙骨块")
                scene.idle(40)
                setForgelightningBricks([
                    [2, 3, 3], [3, 3, 2], [2, 3, 2], 
                    [1, 3, 2], [2, 3, 1]
                ])
                scene.text(20, "然后其他地方分别填上龙霆锻炉砖块")
                scene.idle(40)
                //替换
                scene.world.modifyBlock([2, 2, 2], () => Block.id('iceandfire:dragonforge_lightning_core'), true)
                scene.world.setBlocks([1, 2, 2], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([2, 2, 3], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
                scene.world.setBlocks([3, 2, 2], Block.id('iceandfire:dragonforge_lightning_brick')
                    .with('grill', 'true'), true)
            })
})
```
