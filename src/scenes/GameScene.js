let background,foreground,midground ;
let player1 ;
let enemy1,enemy1Group,enemy1Event ;
let enemy2,enemy2Group,enemy2Event ;
let deathCount = 0 ;
let showDeathCount;
let goal,goalGroup,winEvent;
let musicgame,musicdead;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });

    }

    preload() {
        // set background
        this.load.image('background','image/BG Main.png');
        // set foreground
        this.load.image('foreground','image/Foreground.png');
        // set midground
        this.load.image('midground','image/BG Mid.png');
        // set player1
        this.load.spritesheet('player1','image/player1.png',{frameWidth: 130,frameHeight:130});
        // set enemy1
        this.load.spritesheet('enemy1','image/enemy1.png',{frameWidth: 128,frameHeight: 128});
        // set enemy2
        this.load.spritesheet('enemy2','image/enemy2.png',{frameWidth: 130,frameHeight: 130});
        // set goal
        this.load.image('goal','image/Goal.png');
        // set sound
        this.load.audio('musicgame','music/GameplayBGM.mp3');
        this.load.audio('musicdead','music/PlayerDiedSFX.wav');
    }

    create() {
        // add background
        background = this.add.image(400,300,'background').setScale(0.75);
        background = this.add.tileSprite(0,0,2000,800,'background').setOrigin(0,0).setScale(0.75);

        // movement background
        midground = this.add.tileSprite(0,0,2000,800,'midground').setOrigin(0,0).setScale(0.75);
        foreground = this.add.tileSprite(0,0,2000,800,'foreground').setOrigin(0,0).setScale(0.75);
        
        // set deathcount
        showDeathCount = this.add.text(16,16,"your death : 0",{ font: "30px Arial", fill: "#ff2200"});
        showDeathCount.setText("your death : " + deathCount);

        // set music
        musicgame = this.sound.add('musicgame');
        musicgame.play();

        musicdead = this.sound.add('musicdead');

        // player1
        player1 = this.physics.add.sprite(300,800,'player1').setScale(1).setSize(90,90);
        // player1 animation
        this.anims.create({
            key : 'player1Ani',
            frames: this.anims.generateFrameNumbers('player1',{
                start : 0,
                end : 4
            }),
            framerate : 100,
            repeat : -1
        })
        
        // collide player1
        player1.setCollideWorldBounds(true);

        // destroy
        function Destroy(){
            player1.destroy();
            deathCount++;
            console.log("your death : " + deathCount + " time");
            musicdead.play();
            musicgame.stop();
        //  enemy1Group.setVelocityX(0);
        //  enemy2Group.setVelocityX(0);
        //  enemy1Event.paused = true;
        //  enemy2Event.paused = true;  
        }

        // enemy1
        enemy1 = this.physics.add.sprite(100000,0,'enemy1');
        // enemy1 animation
        this.anims.create({
            key : 'enemy1Ani',
            frames: this.anims.generateFrameNumbers('enemy1',{
                start: 0,
                end: 4
            }),
            delay : 0.1,
            framerate : 100,
            repeat : -1
        })

        // enemy1 group
        enemy1Group = this.physics.add.group();

        //timeline wave1
        enemy1Event = this.time.addEvent({
            delay: 3000,
            callback: function(){
                enemy1 = this.physics.add.sprite(800,Math.floor(Math.random() *600),'enemy1').setScale(1).setSize(80,80);
                enemy1Group.add(enemy1);
                enemy1Group.setVelocityX(-300);
                enemy1Event.delay = 1000;
                this.physics.add.overlap(player1,enemy1Group,()=>{
                    Destroy();
                    this.scene.start('GameoverScene');
                });
            },
            startAt : 1000,
            callbackScope: this,
            loop: true,
            paused: false,
        })

        // enemy2
        enemy2 = this.physics.add.sprite(100000,0,'enemy2');

        // enemy2 animation
        this.anims.create({
            key : 'enemy2Ani',
            frames: this.anims.generateFrameNumbers('enemy2',{
                start: 0,
                end: 4
            }),
            framerate : 10,
            repeat : -1
        })

        // enemy2 group
        enemy2Group = this.physics.add.group();
        
        // timeline wave2
        enemy2Event = this.time.addEvent({
            delay:30000,
            callback: function(){
                enemy2 = this.physics.add.sprite(800,Math.floor(Math.random() *600),'enemy2').setScale(1).setSize(80,80);
                enemy2Group.add(enemy2);
                enemy2Group.setVelocityX(-1000);
                enemy2Event.delay = 2000;
                this.physics.add.overlap(player1,enemy2Group,()=>{
                    Destroy();
                    this.scene.start('GameoverScene');
                });
            },
            startAt: 1000,
            callbackScope: this,
            loop: true,
            paused: false
        })

        //win goal stage
        goal = this.physics.add.sprite(100000,0,'goal');
        goalGroup = this.physics.add.group();
        winEvent = this.time.addEvent({
            delay: 6000,
            callback: function(){
                goal = this.physics.add.sprite(1500,300,'goal').setScale(1.25).setSize(300,600);
                goalGroup.add(goal);
                goalGroup.setVelocityX(-200);
                this.physics.add.overlap(player1,goalGroup,()=>{
                    this.scene.start('WinScene');
                    musicgame.stop();
                    console.log("your total death : " + deathCount + " time");
                });
                enemy1Event.paused = true;
                enemy2Event.paused = true;
            },
            callbackScope: this,
            loop: false,
            paused: false
        })
    }

    update() {
        
        // background movement
        background.tilePositionX += 0.3;
        foreground.tilePositionX += 2.5;
        midground.tilePositionX += 1;

        // controll your player1 in x and y axis
        this.input.on('pointermove',(pointer) =>
        {   
            player1.x = pointer.x
            player1.y = pointer.y
        });

        // if keyX is down it's change colorsubmarine


        // controll animation
        player1.anims.play('player1Ani',true);
        enemy1.anims.play('enemy1Ani',true);
        enemy2.anims.play('enemy2Ani',true);
    }
}

export default GameScene;
