/**
 * Created by Riven on 2018/07/27
 */

const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
// const formatMessage = require('format-message');
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;


const ottoCommon = gen => {
    gen.includes_['otto'] = `
#include <BatReader.h>
#include <US.h>
#include "MaxMatrix.h"
MaxMatrix ledmatrix=MaxMatrix(12,10,11, 1); //PIN  12=DIN, PIN 10=CS, PIN 11=CLK

//-- Library to manage serial commands
#include <OttoSerialCommand.h>
OttoSerialCommand SCmd;  //The SerialCommand object

//-- Otto Library
#include <Otto.h>
Otto Otto;  //This is Otto!

#define PIN_YL 2 //servo[0]
#define PIN_YR 3 //servo[1]
#define PIN_RL 4 //servo[2]
#define PIN_RR 5 //servo[3]

//-- Movement parameters
int T=1000;              //Initial duration of movement
`;
    gen.setupCodes_['otto'] = `
    //Serial communication initialization
    Serial.begin(115200);  
    //Set the servo pins
    Otto.init(PIN_YL,PIN_YR,PIN_RL,PIN_RR,true);
    // set up Matrix display
    ledmatrix.init();
    ledmatrix.setIntensity(1);
    //Set a random seed
    randomSeed(analogRead(A6));
    //Otto wake up!
    Otto.sing(S_connection);
    Otto.home();`;

    gen.definitions_['otto_move'] = `
//-- Function to execute the right movement according the movement command received.
void move(int moveId, int moveSize){

  bool manualMode = false;

  switch (moveId) {
    case 0:
      Otto.home();
      break;
    case 1: //M 1 1000 
      Otto.walk(1,T,1);
      break;
    case 2: //M 2 1000 
      Otto.walk(1,T,-1);
      break;
    case 3: //M 3 1000 
      Otto.turn(1,T,1);
      break;
    case 4: //M 4 1000 
      Otto.turn(1,T,-1);
      break;
    case 5: //M 5 1000 30 
      Otto.updown(1,T,moveSize);
      break;
    case 6: //M 6 1000 30
      Otto.moonwalker(1,T,moveSize,1);
      break;
    case 7: //M 7 1000 30
      Otto.moonwalker(1,T,moveSize,-1);
      break;
    case 8: //M 8 1000 30
      Otto.swing(1,T,moveSize);
      break;
    case 9: //M 9 1000 30 
      Otto.crusaito(1,T,moveSize,1);
      break;
    case 10: //M 10 1000 30 
      Otto.crusaito(1,T,moveSize,-1);
      break;
    case 11: //M 11 1000 
      Otto.jump(1,T);
      break;
    case 12: //M 12 1000 30 
      Otto.flapping(1,T,moveSize,1);
      break;
    case 13: //M 13 1000 30
      Otto.flapping(1,T,moveSize,-1);
      break;
    case 14: //M 14 1000 20
      Otto.tiptoeSwing(1,T,moveSize);
      break;
    case 15: //M 15 500 
      Otto.bend(1,T,1);
      break;
    case 16: //M 16 500 
      Otto.bend(1,T,-1);
      break;
    case 17: //M 17 500 
      Otto.shakeLeg(1,T,1);
      break;
    case 18: //M 18 500 
      Otto.shakeLeg(1,T,-1);
      break;
    case 19: //M 19 500 20
      Otto.jitter(1,T,moveSize);
      break;
    case 20: //M 20 500 15
      Otto.ascendingTurn(1,T,moveSize);
      break;
    default:
        manualMode = true;
      break;
  }
}
`
    gen.definitions_['otto_ges'] = `
//-- Function to receive gesture commands
void receiveGesture(int gesture){
    Otto.home(); 

    switch (gesture) {
      case 1: //H 1 
        Otto.playGesture(OttoHappy);
        break;
      case 2: //H 2 
        Otto.playGesture(OttoSuperHappy);
        break;
      case 3: //H 3 
        Otto.playGesture(OttoSad);
        break;
      case 4: //H 4 
        Otto.playGesture(OttoSleeping);
        break;
      case 5: //H 5  
        Otto.playGesture(OttoFart);
        break;
      case 6: //H 6 
        Otto.playGesture(OttoConfused);
        break;
      case 7: //H 7 
        Otto.playGesture(OttoLove);
        break;
      case 8: //H 8 
        Otto.playGesture(OttoAngry);
        break;
      case 9: //H 9  
        Otto.playGesture(OttoFretful);
        break;
      case 10: //H 10
        Otto.playGesture(OttoMagic);
        break;  
      case 11: //H 11
        Otto.playGesture(OttoWave);
        break;   
      case 12: //H 12
        Otto.playGesture(OttoVictory);
        break; 
      case 13: //H 13
        Otto.playGesture(OttoFail);
        break;         
      default:
        break;
    }
}
`

    gen.definitions_['otto_sing'] = `
//-- Function to receive sing commands
void receiveSing(int sing){

    Otto.home(); 

    switch (sing) {
      case 1: //K 1 
        Otto.sing(S_connection);
        break;
      case 2: //K 2 
        Otto.sing(S_disconnection);
        break;
      case 3: //K 3 
        Otto.sing(S_surprise);
        break;
      case 4: //K 4 
        Otto.sing(S_OhOoh);
        break;
      case 5: //K 5  
        Otto.sing(S_OhOoh2);
        break;
      case 6: //K 6 
        Otto.sing(S_cuddly);
        break;
      case 7: //K 7 
        Otto.sing(S_sleeping);
        break;
      case 8: //K 8 
        Otto.sing(S_happy);
        break;
      case 9: //K 9  
        Otto.sing(S_superHappy);
        break;
      case 10: //K 10
        Otto.sing(S_happy_short);
        break;  
      case 11: //K 11
        Otto.sing(S_sad);
        break;   
      case 12: //K 12
        Otto.sing(S_confused);
        break; 
      case 13: //K 13
        Otto.sing(S_fart1);
        break;
      case 14: //K 14
        Otto.sing(S_fart2);
        break;
      case 15: //K 15
        Otto.sing(S_fart3);
        break;    
      case 16: //K 16
        Otto.sing(S_mode1);
        break; 
      case 17: //K 17
        Otto.sing(S_mode2);
        break; 
      case 18: //K 18
        Otto.sing(S_mode3);
        break;   
      case 19: //K 19
        Otto.sing(S_buttonPushed);
        break;                      
      default:
        break;
    }
}
`

    gen.definitions_['otto_buzz'] = `
//-- Function to receive buzzer commands
void recieveBuzzer(int frec, int duration){
  Otto._tone(frec, duration, 1);   
}
`

};



class OttoDIY {
    constructor (runtime){
        this.runtime = runtime;
        this.comm = runtime.ioDevices.comm;
        this.session = null;
        this.runtime.registerPeripheralExtension('OttoDiy', this);
        // session callbacks
        this.onmessage = this.onmessage.bind(this);
        this.onclose = this.onclose.bind(this);

        this.decoder = new TextDecoder();
        this.lineBuffer = '';
    }

    write (data){
        if (!data.endsWith('\n')) data += '\n';
        if (this.session) this.session.write(data);
    }

    report (data){
        return new Promise(resolve => {
            this.write(data);
            this.reporter = resolve;
        });
    }


    onmessage (data){
        const dataStr = this.decoder.decode(data);
        this.lineBuffer += dataStr;
        if (this.lineBuffer.indexOf('\n') !== -1){
            const lines = this.lineBuffer.split('\n');
            this.lineBuffer = lines.pop();
            for (const l of lines){
                const ret = this.parseCmd(l);
                if (this.reporter) this.reporter(ret);
            }
        }
    }

    onclose (error){
        log.warn('on close', error);
        this.session = null;
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_DISCONNECT_ERROR);
    }

    // method required by vm runtime
    scan (){
        this.comm.getDeviceList().then(result => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }

    connect (id){
        this.comm.connect(id).then(sess => {
            this.session = sess;
            this.session.onmessage = this.onmessage;
            this.session.onclose = this.onclose;
            // notify gui connected
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);
        }).catch(err => {
            log.warn('connect peripheral fail', err);
        });
    }

    disconnect (){
        this.session.close();
    }

    isConnected (){
        return Boolean(this.session);
    }

    _buildMenu (info) {
        return info.map((entry, index) => {
            const obj = {};
            obj.text = entry.name;
            obj.value = String(index + 1);
            return obj;
        });
    }

    getInfo (){
        return {
            id: 'OttoDiy',
            name: 'OttoDiy',
            showStatusButton: true,

            blocks: [
                {
                    opcode: 'mode',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.mode',
                        default: 'Jump Mode [MODE]'
                    }),
                    arguments: {
                        MODE: {
                            type: ArgumentType.NUMBER,
                            menu: 'MODES',
                            defaultValue: 1
                        }
                    },
                    func: 'mode'
                },
                {
                    opcode: 'calibrate',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.calibrate',
                        default: 'Set Calibrate Left Leg: [LEFTLEG] Right Leg [RIGHTLEG] Left Foot [LEFTFOOT] Right Foot [RIGHTFOOT]'
                    }),
                    arguments: {
                        LEFTLEG: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RIGHTLEG: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        LEFTFOOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        RIGHTFOOT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    },
                    func: 'noop'
                },
                {
                    opcode: 'move',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.move',
                        default: 'move [ACTIONS] speed [SPEED]'
                    }),
                    arguments: {
                        ACTIONS: {
                            type: ArgumentType.NUMBER,
                            menu: 'ACTIONS',
                            defaultValue: 1
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1000
                        }
                    },
                    func: 'move',
                    gen: {
                        arduino: this.moveCpp
                    }
                },
                {
                    opcode: 'gesture',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.gesture',
                        default: 'gesture [GESTURE]'
                    }),
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.NUMBER,
                            menu: 'GESTURE',
                            defaultValue: 1
                        }
                    },
                    func: 'gesture',
                    gen: {
                        arduino: this.gestureCpp
                    }
                },
                {
                    opcode: 'sing',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.sing',
                        default: 'Sing [SOUND]'
                    }),
                    arguments: {
                        SOUND: {
                            type: ArgumentType.NUMBER,
                            menu: 'SONGS',
                            defaultValue: 1
                        }
                    },
                    func: 'sing',
                    gen: {
                        arduino: this.singCpp
                    }
                },
                {
                    opcode: 'melody',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.melody',
                        default: 'Play melody Note [NOTE] in beat [BEATS]'
                    }),
                    arguments: {
                        NOTE: {
                            type: ArgumentType.NUMBER,
                            menu: 'NOTES',
                            defaultValue: '262'
                        },
                        BEATS: {
                            type: ArgumentType.NUMBER,
                            menu: 'BEATS',
                            defaultValue: '500'
                        }
                    },
                    func: 'melody',
                    gen: {
                        arduino: this.melodyCpp
                    }
                },
                {
                    opcode: 'stop',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'OttoDIY.stop',
                        default: 'Stop'
                    }),
                    func: 'stop',
                    gen: {
                        arduino: this.stopCpp
                    }
                },
                {
                    opcode: 'getDistance',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'OttoDIY.getDistance',
                        default: 'Get Distance'
                    }),
                    func: 'distance',
                    gen: {
                        arduino: this.distanceCpp
                    }
                },
                '---',
                {
                    opcode: 'ledmatrix',
                    blockType: BlockType.COMMAND,

                    text: 'LED [MAT]',
                    arguments: {
                        MAT: {
                            type: ArgumentType.LEDMATRIX,
                            defaultValue: '00000000024000000000042003c00000'
                        }
                    },
                    func: 'ledmatrix'
                },
                {
                    opcode: 'getNoise',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'OttoDIY.getNoise',
                        default: 'Get Noise'
                    }),
                    func: 'noise',
                },
                {
                    opcode: 'getLight',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'OttoDIY.getLight',
                        default: 'Get Light in [LIGHT]'
                    }),
                    arguments: {
                        LIGHT: {
                            type: ArgumentType.NUMBER,
                            menu: 'LIGHT',
                            defaultValue: 1
                        }
                    },
                    func: 'noop',
                },
                {
                    opcode: 'getButton',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'OttoDIY.getButton',
                        default: 'Button [BUTTON] pressed'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'BUTTON',
                            defaultValue: 1
                        }
                    },
                    func: 'noop',
                },
            ],
            menus: {
                MODES: this._buildMenu(this.MODE_INFO),
                ACTIONS: this._buildMenu(this.ACTION_INFO),
                SPEED: this._buildMenu(this.SPEED_INFO),
                GESTURE: this._buildMenu(this.GESTURE_INFO),
                SONGS: this._buildMenu(this.SONGS_INFO),
                NOTES: [
                    {text: 'C4', value: '262'},
                    {text: 'D4', value: '294'},
                    {text: 'E4', value: '330'},
                    {text: 'F4', value: '349'},
                    {text: 'G4', value: '392'},
                    {text: 'A4', value: '440'},
                    {text: 'B4', value: '494'},

                    {text: 'C5', value: '523'},
                    {text: 'D5', value: '587'},
                    {text: 'E5', value: '659'},
                    {text: 'F5', value: '698'},
                    {text: 'G5', value: '784'},
                    {text: 'A5', value: '880'},
                    {text: 'B5', value: '988'},

                    {text: 'C6', value: '1047'},
                    {text: 'D6', value: '1175'},
                    {text: 'E6', value: '1319'},
                    {text: 'F6', value: '1397'},
                    {text: 'G6', value: '1568'},
                    {text: 'A6', value: '1760'},
                    {text: 'B6', value: '1976'}
                ],
                BEATS: [
                    {text: '1/2', value: '500'},
                    {text: '1/4', value: '250'},
                    {text: '1/8', value: '125'},
                    {text: '1/1', value: '1000'},
                    {text: '2/1', value: '2000'}
                ],
                MOUTH: this._buildMenu(this.MOUTH_INFO),
                ANIMOUTH: this._buildMenu(this.ANIMOUTH_INFO),
                LIGHT: [
                    {text: 'Left', value: '1'},
                    {text: 'Right', value: '0'}
                ],
                BUTTON: [
                    {text: 'key1', value: '2'},
                    {text: 'key2', value: '3'}
                ]
            }
        };
    }

    get ANIMOUTH_INFO (){
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.littleUuh',
                    default: 'Little Uuh'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.dreamMouth',
                    default: 'Dream Mouth'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.adivinawi',
                    default: 'adivinawi'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.waveMouth',
                    default: 'Wave Mouth'
                })
            }
        ];
    }

    get MOUTH_INFO (){
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.zero',
                    default: '0'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.one',
                    default: '1'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.two',
                    default: '2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.three',
                    default: '3'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.four',
                    default: '4'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.five',
                    default: '5'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.six',
                    default: '6'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.seven',
                    default: '7'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.eight',
                    default: '8'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.nine',
                    default: '9'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.smile',
                    default: 'Smile'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.happyOpen',
                    default: 'Happy Open'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.happyClosed',
                    default: 'Happy Closed'
                })
            },{
                name: formatMessage({
                    id: 'OttoDIY.heart',
                    default: 'heart'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.bigSurprise',
                    default: 'Big Surprise'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.bigSurprise',
                    default: 'Big Surprise'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.smallSurprise',
                    default: 'Small Surprise'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.tongueOut',
                    default: 'Tongue Out'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.vamp1',
                    default: 'Vamp 1'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.vamp2',
                    default: 'Vamp 2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.lineMouth',
                    default: 'Line Mouth'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.confusedMouth',
                    default: 'Confused Mouth'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.diagonal',
                    default: 'Diagonal'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.sadMouth',
                    default: 'Sad Mouth'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.sadOpen',
                    default: 'Sad Open'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.sadClosed',
                    default: 'Sad Closed'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.xMouth',
                    default: 'X Mouth'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.interrogation',
                    default: 'interrogation'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.thunder',
                    default: 'thunder'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.culito',
                    default: 'culito'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.angryMouth',
                    default: 'angryMouth'
                })
            }
        ];
    }

    get SONGS_INFO (){
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.Connection',
                    default: 'Connection'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Disconnection',
                    default: 'Disconnection'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.OhOoh',
                    default: 'OhOoh'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.OhOoh2',
                    default: 'OhOoh2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Cuddly',
                    default: 'Cuddly'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Sleeping',
                    default: 'Sleeping'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Happy',
                    default: 'Happy'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Supperhappy',
                    default: 'Supperhappy'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Happy_short',
                    default: 'Happy short'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Sad',
                    default: 'Sad'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Confused',
                    default: 'Confused'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Fart1',
                    default: 'Fart1'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Fart2',
                    default: 'Fart2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.Fart3',
                    default: 'Fart3'
                })
            }
        ];
    }

    get GESTURE_INFO (){
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.happy',
                    default: 'Happy'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.supperhappy',
                    default: 'Super Happy'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.sad',
                    default: 'Sad'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.sleeping',
                    default: 'Sleeping'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.fart',
                    default: 'Fart'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.confused',
                    default: 'Confused'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.love',
                    default: 'Love'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.angry',
                    default: 'Angry'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.fretful',
                    default: 'Fretful'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.magic',
                    default: 'Magic'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.wave',
                    default: 'Wave'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.victory',
                    default: 'Victory'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.fail',
                    default: 'Fail'
                })
            }
        ];
    }

    get SPEED_INFO () {
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.very_fast',
                    default: 'Very Fast'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.fast',
                    default: 'Fast'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.normal',
                    default: 'Normal'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.slow',
                    default: 'Slow'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.very_slow',
                    default: 'Very Slow'
                })
            }
        ];
    }

    get MODE_INFO (){
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.awaiting',
                    default: 'Awaiting'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.dancing',
                    default: 'Dancing'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.obstacledetect',
                    default: 'Obstacle detector'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.noisedetect',
                    default: 'Noise Detector'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.teleop',
                    default: 'Teleoperation'
                })
            }
        ];
    }

    get ACTION_INFO () {
        return [
            {
                name: formatMessage({
                    id: 'OttoDIY.home',
                    default: 'home'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.forward',
                    default: 'forward'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.backward',
                    default: 'backward'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.turn_left',
                    default: 'turn left'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.turn_right',
                    default: 'turn right'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.updown',
                    default: 'updown'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.moonwalker_left',
                    default: 'moonwalker left'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.moonwalker_right',
                    default: 'moonwalker right'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.swing',
                    default: 'swing'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.crusaito_1',
                    default: 'crusaito 1'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.crusaito_2',
                    default: 'crusaito 2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.jump',
                    default: 'jump'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.jump',
                    default: 'jump'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.flapping_1',
                    default: 'flapping 1'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.flapping_2',
                    default: 'flapping 2'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.tiptoeSwing',
                    default: 'tiptoeSwing'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.bend_left',
                    default: 'bend left'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.bend_right',
                    default: 'bend right'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.shakeLeg_right',
                    default: 'shakeLeg right'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.shakeLeg_left',
                    default: 'shakeLeg left'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.jitter',
                    default: 'jitter'
                })
            },
            {
                name: formatMessage({
                    id: 'OttoDIY.ascendingTurn',
                    default: 'ascendingTurn'
                })
            }
        ];
    }

    noop (){

    }

    wait (timeout){
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    // notice: menu index start from 1

    mode (args){
        this.write(`J ${args.MODE - 1}\r\n`);
    }

    move (args){
        const action = args.ACTIONS;
        const speed = args.SPEED;
        // const size = args.SIZE;
        const str = `M ${action - 1} ${speed}\r\n`;
        this.write(str);
    }

    gesture (args){
        const gesture = args.GESTURE;
        const str = `H ${gesture}\r\n`;
        this.write(str);
    }

    sing (args){
        const song = args.SOUND;
        const str = `K ${song}\r\n`;
        this.write(str);
    }

    melody (args){
        const str = `T ${args.NOTE} ${args.BEATS}\r\n`;
        this.write(str);
    }

    ledmatrix (args){
        let cmd = `L ${args.MAT}\r\n`;
        this.write(cmd);
    }

    stop (){
        this.write('S\r\n');
    }

    distance (){
        return this.report('D\r\n');
    }

    noise (){
        return this.report('N\r\n');
    }
    
    moveCpp (gen, block){
        ottoCommon(gen);
        const code = gen.template2code(block, 'move');
        return gen.line(code);
    }
    
    gestureCpp (gen, block){
        ottoCommon(gen);
        const code = gen.template2code(block, 'receiveGesture');
        return gen.line(code);
    }

    singCpp (gen, block){
        ottoCommon(gen);
        const code = gen.template2code(block, 'receiveSing');
        return gen.line(code);
    }

    melodyCpp (gen, block){
        ottoCommon(gen);
        const code = gen.template2code(block, 'recieveBuzzer');
        return gen.line(code);
    }
    
    stopCpp (gen, block){
        ottoCommon(gen);
        const code = gen.template2code(block, 'Otto.home');
        return gen.line(code);
    }
    
    distanceCpp (gen, block){
        ottoCommon(gen);
        return gen.template2code(block, 'Otto.getDistance');
    }

    parseCmd (cmd){
        const start = cmd.indexOf('&&');
        if (start !== -1){
            cmd = cmd.substr(start+2).replace('%%', '');
            const tmp = cmd.split(' ');
            if (tmp[0] === 'D'){
                return tmp[1];
            } else if (tmp[0] === 'N'){
                return tmp[1];
            }
        }
    }
}

module.exports = OttoDIY;
