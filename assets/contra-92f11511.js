import{B as s}from"./bufferShader-61810f9d.js";import{S as P,P as R,W as w,V as m,g as X,M as I,a as L,j as C,C as A}from"./three.module-d899fbfe.js";import{g as G,h as Y,x as U,y as h,o as D,c as N,p as z,f as W,a as f,_ as b}from"./index-ec03aec8.js";const V=`// Gameplay\r
\r
// debug cheats\r
//#define KONAMI_CODE\r
//#define SPEED_RUN\r
//#define GOD_MODE\r
\r
uniform vec3      iResolution;           // viewport resolution (in pixels)\r
uniform float     iTime;                 // shader playback time (in seconds)\r
uniform int       iFrame;                // shader playback frame\r
uniform sampler2D iChannel0;\r
\r
\r
uniform int     customLeft;    //\r
uniform int     customUp;    //\r
uniform int     customDown;    //\r
uniform int     customRight;    //\r
uniform int     customJump;    //\r
uniform int     customShoot;    //\r
\r
\r
\r
\r
\r
// storage\r
const vec2 txPlayer 			= vec2( 0.0, 0.0 ); 	// xy - pos, z - jump start, w - jump dir\r
const vec2 txPlayerState		= vec2( 1.0, 0.0 ); 	// x - state, y - frame, z - jump tick, w - lifes\r
const vec2 txPlayerDir			= vec2( 2.0, 0.0 ); 	// xy - dir, z - flip, w - immortality\r
const vec2 txPlayerWeapon		= vec2( 3.0, 0.0 ); 	// x - weapon, y - weapon cooldown, z - weapon fire rate, w - weapon bullet num\r
const vec2 txCamera 			= vec2( 4.0, 0.0 ); 	// x - cam offset, y - spawn counter, z - soldier spawn counter\r
const vec2 txSoldier0 			= vec2( 5.0, 0.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier1 			= vec2( 5.0, 1.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier2 			= vec2( 5.0, 2.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier0State 		= vec2( 6.0, 0.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier1State 		= vec2( 6.0, 1.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier2State 		= vec2( 6.0, 2.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSniper	 			= vec2( 7.0, 0.0 ); 	// xy - pos, z - flip, w - weapon cooldown\r
const vec2 txPlayerBullet0 		= vec2( 8.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet1 		= vec2( 8.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet2 		= vec2( 8.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet3 		= vec2( 8.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet4 		= vec2( 8.0, 4.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet5 		= vec2( 8.0, 5.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet0 		= vec2( 9.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet1 		= vec2( 9.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet2 		= vec2( 9.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet3 		= vec2( 9.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txExplosion 			= vec2( 10.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txHit 				= vec2( 11.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txTurret0			= vec2( 12.0, 0.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret1			= vec2( 12.0, 1.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret0State		= vec2( 13.0, 0.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txTurret1State		= vec2( 13.0, 1.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txPowerUp			= vec2( 14.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txPowerUpState		= vec2( 15.0, 0.0 ); 	// x - state, y - initial height, z - jump tick\r
const vec2 txBossCore			= vec2( 16.0, 0.0 ); 	// xy - pos, z - HP\r
const vec2 txBossCannon0		= vec2( 17.0, 0.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossCannon1		= vec2( 17.0, 1.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossBullet0		= vec2( 18.0, 0.0 ); 	// xy - pos, zw - velocity\r
const vec2 txBossBullet1		= vec2( 18.0, 1.0 ); 	// xy - pos, zw - velocity\r
const vec2 txGameState			= vec2( 19.0, 0.0 ); 	// x - state, y - state tick\r
const vec2 txBridge				= vec2( 20.0, 0.0 ); 	// x - draw start, y - explode tick\r
\r
#ifdef KONAMI_CODE\r
	const float PLAYER_LIFE_NUM		= 10.0;\r
#else\r
	const float PLAYER_LIFE_NUM		= 3.0;\r
#endif\r
\r
#ifdef SPEED_RUN\r
	const float PLAYER_RUN_SPEED 	= 5.0;\r
#else\r
	const float PLAYER_RUN_SPEED 	= 1.0;\r
#endif\r
\r
const float MATH_PI 				= 3.14159265359;\r
const float NES_RES_X				= 224.0;\r
const float NES_RES_Y 				= 192.0;\r
const float KEY_A    				= 65.0;\r
const float KEY_Q    				= 81.0;\r
const float KEY_S    				= 83.0;\r
const float KEY_W    				= 87.0;\r
const float KEY_LEFT  				= 37.0;\r
const float KEY_UP    				= 38.0;\r
const float KEY_RIGHT 				= 39.0;\r
const float KEY_DOWN  				= 40.0;\r
const float STATE_RUN				= 0.0;\r
const float STATE_PRONE 			= 1.0;\r
const float STATE_JUMP 				= 2.0;\r
const float STATE_FALL 				= 3.0;\r
const float STATE_WATER 			= 4.0;\r
const float STATE_UNDER_WATER 		= 5.0;\r
const float WEAPON_RIFLE			= 0.0;\r
const float WEAPON_MACHINE_GUN		= 1.0;\r
const float RIFLE_FIRE_RATE			= 20.0;\r
const float RIFLE_BULLET_NUM		= 4.0;\r
const float MACHINE_GUN_FIRE_RATE	= 10.0;\r
const float MACHINE_GUN_BULLET_NUM	= 6.0;\r
const float SNIPER_FIRE_RATE		= 160.0;\r
const float TURRET_FIRE_RATE		= 100.0;\r
const float PLAYER_SPAWN_HEIGHT		= 200.0;\r
const float PLAYER_JUMP_HEIGHT		= 16.0 * 3.0;\r
const float PLAYER_IMMORTALITY_LEN	= 60.0 * 3.0;\r
const float PLAYER_RUN_ANIM_SPEED 	= 0.13;\r
const float PLAYER_JUMP_ANIM_SPEED	= 0.13;\r
const float PLAYER_FALL_SPEED 		= 3.0;\r
const float PLAYER_BULLET_SPEED		= 3.0;\r
const float PLAYER_HIT_BOX_SIZE_MUL	= 0.7;\r
const float ENEMY_RUN_SPEED 		= 1.0;\r
const float ENEMY_BULLET_SPEED 		= 1.0;\r
const float ENEMY_ANIM_SPEED		= 0.13;\r
const float SOLDIER_SPAWN_RATE		= 180.0;\r
const float BOSS_CORE_HP			= 32.0;\r
const float BOSS_CANNON_HP			= 8.0;\r
const float BOSS_CANNON_FIRE_RATE	= 120.0;\r
const float WATER_HEIGHT			= 8.0;\r
const float WATER_END				= 32.0 * 63.0;\r
const float BRIDGE_0_START_TILE		= 30.0;\r
const float BRIDGE_0_END_TILE		= 35.0;\r
const float BRIDGE_1_START_TILE		= 40.0;\r
const float BRIDGE_1_END_TILE		= 45.0;\r
const float BRIGDE_EXPLODE_TIME		= 70.0;\r
const float CAMERA_END				= 32.0 * 102.0;\r
const float PLAYER_END				= 32.0 * 108.0 + 16.0;\r
const float SOLDIER_SPAWN_END		= 32.0 * 99.0 - 32.0 * 2.0;\r
const vec2 	BILL_PRONE_SIZE			= vec2( 32.0, 18.0 );\r
const vec2 	BILL_RUN_SIZE			= vec2( 24.0, 34.0 );\r
const vec2 	BILL_JUMP_SIZE			= vec2( 20.0, 20.0 );\r
const vec2 	SOLDIER_SIZE 			= vec2( 16.0, 32.0 );\r
const vec2 	SNIPER_SIZE				= vec2( 24.0, 32.0 );\r
const vec2 	BULLET_SIZE				= vec2( 3.0,  3.0  );\r
const vec2 	POWER_BULLET_SIZE		= vec2( 5.0,  5.0  );\r
const vec2 	TURRET_SIZE				= vec2( 32.0, 32.0 );\r
const vec2 	POWER_UP_SIZE			= vec2( 24.0, 14.0 );\r
const vec2 	BOSS_CORE_SIZE			= vec2( 24.0, 31.0 );\r
const vec2 	BOSS_CANNON_SIZE		= vec2( 14.0, 6.0 );\r
const float TURRET_HP				= 8.0;\r
const float GAME_STATE_TITLE		= 0.0;\r
const float GAME_STATE_LEVEL		= 1.0;\r
const float GAME_STATE_LEVEL_DIE	= 2.0;\r
const float GAME_STATE_LEVEL_WIN	= 3.0;\r
const float GAME_STATE_GAME_OVER	= 4.0;\r
const float GAME_STATE_VICTORY		= 5.0;\r
const float UI_TITLE_TIME			= 120.0;\r
const float UI_GAME_START_TIME		= 60.0;\r
const float UI_VICTORY_TIME			= 300.0;\r
\r
vec4 gPlayer;\r
vec4 gPlayerState;\r
vec4 gPlayerDir;\r
vec4 gPlayerWeapon;\r
vec4 gCamera;\r
vec4 gSoldier0;\r
vec4 gSoldier1;\r
vec4 gSoldier2;\r
vec4 gSoldier0State;\r
vec4 gSoldier1State;\r
vec4 gSoldier2State;\r
vec4 gSniper;\r
vec4 gPlayerBullet0;\r
vec4 gPlayerBullet1;\r
vec4 gPlayerBullet2;\r
vec4 gPlayerBullet3;\r
vec4 gPlayerBullet4;\r
vec4 gPlayerBullet5;\r
vec4 gEnemyBullet0;\r
vec4 gEnemyBullet1;\r
vec4 gEnemyBullet2;\r
vec4 gEnemyBullet3;\r
vec4 gExplosion;\r
vec4 gHit;\r
vec4 gTurret0;\r
vec4 gTurret1;\r
vec4 gTurret0State;\r
vec4 gTurret1State;\r
vec4 gPowerUp;\r
vec4 gPowerUpState;\r
vec4 gBossCore;\r
vec4 gBossCannon0;\r
vec4 gBossCannon1;\r
vec4 gBossBullet0;\r
vec4 gBossBullet1;\r
vec4 gGameState;\r
vec4 gBridge;\r
\r
float IsInside( vec2 p, vec2 c ) { vec2 d = abs(p-0.5-c) - 0.5; return -max(d.x,d.y); }\r
\r
float Rand(){\r
    vec2 co = vec2( iTime, iTime );\r
    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\r
}\r
\r
vec4 LoadValue( vec2 tx ){\r
    return texture( iChannel0, ( tx + 0.5 ) /  iResolution.xy );\r
}\r
\r
void StoreValue( vec2 re, vec4 va){\r
    vec4 fragCoords = floor( gl_FragCoord );\r
    gl_FragColor = ( fragCoords.x == re.x && fragCoords.y == re.y ) ? va : gl_FragColor;\r
}\r
\r
bool Collide( vec2 p0, vec2 s0, vec2 p1, vec2 s1 ){\r
    // pivot x in the middle, and y in the bottom\r
    p0.x -= s0.x * 0.5;\r
    p1.x -= s1.x * 0.5;\r
    \r
    return 		p0.x <= p1.x + s1.x\r
        	&& 	p0.y <= p1.y + s1.y\r
        	&& 	p1.x <= p0.x + s0.x\r
        	&& 	p1.y <= p0.y + s0.y;\r
}\r
\r
float GetSupport( vec2 p ){\r
    float tileX	= floor( p.x / 32.0 );\r
    float tileY	= floor( p.y / 16.0 );\r
    \r
    bool grass0 = false;\r
    bool grass2 = false;\r
    bool grass3 = false;\r
    bool grass4 = false;\r
    bool grass6 = false;\r
    bool grass8 = false;\r
    \r
	if ( 		( tileX >= 52.0 && tileX < 67.0 ) \r
			|| 	( tileX >= 72.0 && tileX < 77.0 )   \r
			|| 	( tileX >= 86.0 && tileX < 88.0 ) ){\r
        grass8 = true;\r
    }\r
    \r
	if ( 		( tileX >= 3.0   && tileX < 30.0 ) \r
        	|| 	( tileX >= 35.0  && tileX < 40.0 ) \r
        	|| 	( tileX >= 45.0  && tileX < 53.0 ) \r
        	|| 	( tileX >= 66.0  && tileX < 73.0 )\r
            || 	( tileX >= 78.0  && tileX < 80.0 )\r
            || 	( tileX >= 85.0  && tileX < 87.0 )\r
            || 	( tileX >= 89.0  && tileX < 91.0 )\r
            ||  ( tileX >= 102.0 && tileX < 106.0 ) )\r
    {\r
        grass6 = true;\r
    }\r
    \r
	if ( 		( tileX >= 10.0 && tileX < 13.0 )\r
			||	( tileX >= 18.0 && tileX < 20.0 )\r
        	|| 	( tileX >= 58.0 && tileX < 65.0 )\r
			|| 	( tileX >= 76.0 && tileX < 79.0 )\r
            || 	( tileX >= 81.0 && tileX < 83.0 )\r
            || 	( tileX >= 90.0 && tileX < 95.0 )\r
            ||  ( tileX >= 100.0 && tileX < 102.0 )\r
            || 	( tileX == 106.0 ) )\r
    {\r
        grass4 = true;\r
    }\r
    \r
    if ( 		( tileX >= 26.0 && tileX < 29.0 )\r
            ||  ( tileX >= 55.0 && tileX < 57.0 )\r
            || 	( tileX == 74.0 )\r
			||  ( tileX == 87.0 )\r
			|| 	( tileX >= 103.0 && tileX < 106.0 ) )\r
    {\r
        grass3 = true;\r
    }\r
        \r
	if ( 		( tileX == 13.0 || tileX == 16.0 )\r
            ||  ( tileX >= 68.0 && tileX < 70.0 )\r
            ||  ( tileX >= 71.0 && tileX < 73.0 )\r
            || 	( tileX >= 82.0 && tileX < 85.0 )\r
            ||  ( tileX >= 97.0 && tileX < 99.0 )\r
            || 	( tileX == 107.0 ) )\r
    {\r
        grass2 = true;\r
    }\r
        \r
	if ( 		( tileX >= 14.0 && tileX < 16.0 ) \r
            || 	( tileX >= 24.0 && tileX < 26.0 ) \r
            || 	( tileX >= 52.0 && tileX < 55.0 ) \r
            || 	( tileX >= 62.0 && tileX < 68.0 )\r
            || 	( tileX == 81.0 )\r
			||  ( tileX == 86.0 )\r
            || 	( tileX >= 93.0 && tileX < 96.0 )\r
            ||  ( tileX >= 102.0 ) )      \r
	{\r
        grass0 = true;\r
    }\r
    \r
	if ( tileX >= BRIDGE_0_START_TILE && tileX < BRIDGE_0_END_TILE && gBridge.x < tileX ){\r
        grass6 = true;\r
    }\r
\r
	if ( tileX >= BRIDGE_1_START_TILE && tileX < BRIDGE_1_END_TILE && gBridge.x < tileX ){\r
        grass6 = true;\r
    } \r
    \r
    float height = 8.0;\r
    if ( grass0 ){\r
        height = 1.0 * 16.0;\r
    }    \r
    if ( grass2 && tileY >= 2.0 ){\r
        height = 3.0 * 16.0;\r
    }\r
    if ( grass3 && tileY >= 3.0 ){\r
        height = 4.0 * 16.0;\r
    }    \r
    if ( grass4 && tileY >= 4.0 ){\r
        height = 5.0 * 16.0;\r
    }\r
    if ( grass6 && tileY >= 6.0 ){\r
        height = 7.0 * 16.0;\r
    } \r
   	if ( grass8 && tileY >= 8.0 ){\r
        height = 9.0 * 16.0;\r
    }     \r
    \r
    return height - 4.0;\r
}\r
\r
void SpawnSniper( float tileX, float tileY, float screenWidth ){\r
    float spawnX = tileX * 32.0 - screenWidth;\r
    if ( gCamera.x > spawnX && gCamera.y < spawnX ) {\r
		gSniper = vec4( tileX * 32.0, tileY * 32.0 + 12.0, 0.0, 0.0 );\r
        gCamera.y = spawnX;\r
    }\r
}\r
\r
void SpawnTurret( float tileX, float tileY, float screenWidth ){\r
    float spawnX = tileX * 32.0 - screenWidth;\r
    if ( gCamera.x >= spawnX && gCamera.y < spawnX ){\r
        if ( gTurret0.x == 0.0 || ( gTurret1.x > 0.0 && gTurret0.x < gTurret1.x ) ){\r
			gTurret0 		= vec4( tileX * 32.0 + 16.0, tileY * 32.0, 0.0, 0.0 );\r
        	gTurret0State	= vec4( TURRET_HP, 0.0, 0.0, 0.0 );\r
        }\r
        else{\r
			gTurret1 		= vec4( tileX * 32.0 + 16.0, tileY * 32.0, 0.0, 0.0 );\r
        	gTurret1State	= vec4( TURRET_HP, 0.0, 0.0, 0.0 );\r
        }\r
\r
        gCamera.y = spawnX;\r
    }\r
}\r
\r
void SpawnPowerUp( float tileX, float screenWidth ){\r
    float spawnX = tileX * 32.0 - screenWidth;\r
    if ( gCamera.x > spawnX && gCamera.y < spawnX ){\r
    	gPowerUp 		= vec4( spawnX, 150.0, 0.0, 0.0 );\r
        gPowerUpState	= vec4( STATE_RUN, 150.0, 0.0, 0.0 );  \r
        gCamera.y = spawnX;\r
    }\r
}\r
\r
void UpdateSpawner( float screenWidth ){\r
    SpawnSniper( 15.0, 0.0, screenWidth );\r
    SpawnPowerUp( 23.0, screenWidth );    \r
    SpawnSniper( 25.0, 0.0, screenWidth );\r
    SpawnTurret( 47.0, 2.0, screenWidth );\r
    SpawnSniper( 48.0, 3.0, screenWidth );\r
    SpawnSniper( 56.0, 4.0, screenWidth );\r
    SpawnPowerUp( 55.0, screenWidth ); \r
    SpawnTurret( 59.0, 3.0, screenWidth );\r
    SpawnTurret( 65.0, 3.0, screenWidth );\r
    SpawnTurret( 72.0, 2.0, screenWidth );\r
    SpawnTurret( 76.0, 5.0, screenWidth );\r
    SpawnSniper( 82.0, 2.0, screenWidth );\r
    SpawnPowerUp( 89.0, screenWidth );    \r
    SpawnTurret( 94.0, 3.0, screenWidth );\r
    SpawnTurret( 101.0, 1.0, screenWidth );\r
    SpawnTurret( 105.0, 1.0, screenWidth );\r
    SpawnSniper( 109.8, 4.875, screenWidth );\r
\r
    if ( gCamera.z == 0.0 && Rand() > 0.5 ){\r
        gCamera.z = SOLDIER_SPAWN_RATE - 20.0;\r
    }\r
\r
    ++gCamera.z;\r
    vec4 newSoldier 		= vec4( gCamera.x + screenWidth, 300.0, -1.0, 0.0 );\r
    vec4 newSoldierState 	= vec4( 0.0, 0.0, 0.0, 0.0 );\r
	newSoldier.y = GetSupport( newSoldier.xy );    \r
    if ( gCamera.x < SOLDIER_SPAWN_END && gCamera.z > SOLDIER_SPAWN_RATE && newSoldier.y > WATER_HEIGHT ){\r
        gCamera.z = 0.0;\r
        \r
        if ( gSoldier0.x <= 0.0 ){\r
            gSoldier0 		= newSoldier;\r
            gSoldier0State 	= newSoldierState;\r
        }else if ( gSoldier1.x <= 0.0 ){\r
            gSoldier1 		= newSoldier;\r
            gSoldier1State 	= newSoldierState;\r
        }else if ( gSoldier2.x <= 0.0 ){\r
            gSoldier2 		= newSoldier;\r
            gSoldier2State 	= newSoldierState;\r
        }        \r
    }\r
}\r
\r
void SpawnEnemyBullet( vec2 pos, vec2 dir ){\r
    if ( gEnemyBullet0.x <= 0.0 ){\r
		gEnemyBullet0 = vec4( pos, dir );\r
    }\r
    else if ( gEnemyBullet1.x <= 0.0 ){\r
        gEnemyBullet1 = vec4( pos, dir );\r
    }else if ( gEnemyBullet2.x <= 0.0 ){\r
        gEnemyBullet2 = vec4( pos, dir );\r
    }else if ( gEnemyBullet3.x <= 0.0 ){\r
        gEnemyBullet3 = vec4( pos, dir );\r
    }    \r
}\r
\r
void UpdateSniper( inout vec4 sniper, vec2 playerTarget ){\r
    if ( sniper.x + SNIPER_SIZE.x * 0.5 < gCamera.x ){\r
        sniper.x = 0.0;\r
    }  \r
    \r
    ++sniper.w;\r
	if ( sniper.x > 0.0 && sniper.w > SNIPER_FIRE_RATE ){\r
        sniper.w = 0.0;\r
        vec2 pos = sniper.xy + vec2( 0.0, 24.0 );\r
        SpawnEnemyBullet( pos, normalize( playerTarget - pos ) );\r
    }\r
    sniper.z = playerTarget.x > sniper.x ? 1.0 : -1.0;    \r
}\r
\r
void UpdateTurret( inout vec4 turret, inout vec4 turretState, vec2 playerTarget ){\r
    if ( turret.x + TURRET_SIZE.x * 0.5 < gCamera.x ){\r
        turret.x = 0.0;\r
    }    \r
    \r
	vec2 turretAim = normalize( playerTarget - turret.xy );\r
\r
    // constrain barrel to one of the 12 possible rotations\r
    float turretAimAngle = atan( -turretAim.y, turretAim.x );    \r
    turretAimAngle = turretAimAngle / ( 2.0 * MATH_PI );\r
    turretAimAngle = floor( turretAimAngle * 12.0 + 0.5 );\r
    turret.z = mod( turretAimAngle + 6.0, 12.0 );\r
    turretAimAngle = turretAimAngle * 2.0 * MATH_PI / 12.0;\r
    turretAim = vec2( cos( turretAimAngle ), -sin( turretAimAngle ) );\r
    \r
    ++turretState.y;\r
	if ( turret.x > 0.0 && turretState.y > TURRET_FIRE_RATE ){\r
        turretState.y = 0.0;\r
		SpawnEnemyBullet( turret.xy, turretAim );\r
    }\r
}\r
\r
void UpdateBossCannon( inout vec4 bossCannon ){\r
    float accX 		= -fract( iTime * 1.069 + bossCannon.x * 7.919 ) * 5.0;\r
    vec4 newBullet	= vec4( bossCannon.xy - vec2( BOSS_CANNON_SIZE.x * 0.5, 0.0), accX, 0.0 );\r
    \r
    ++bossCannon.z;\r
    if ( bossCannon.z > BOSS_CANNON_FIRE_RATE ){\r
        bossCannon.z = 0.0;\r
        if ( gBossBullet0.x <= 0.0 ){\r
            gBossBullet0 = newBullet;\r
        }else if ( gBossBullet1.x <= 0.0 ){\r
            gBossBullet1 = newBullet;\r
        }\r
    }\r
}\r
\r
void PlayerBulletSoldierTest( inout vec4 playerBullet, inout vec4 soldier ){\r
    if ( playerBullet.x > 0.0 && Collide( playerBullet.xy, BULLET_SIZE, soldier.xy, SOLDIER_SIZE ) ){\r
        gExplosion 		= vec4( soldier.xy + vec2( 0.0, SOLDIER_SIZE.y * 0.5 ), 0.0, 0.0 );\r
        gHit		 	= vec4( playerBullet.xy, 0.0, 0.0 );\r
		soldier.x 		= 0.0;\r
        playerBullet.x 	= 0.0;\r
    }\r
}\r
\r
void PlayerBulletSniperTest( inout vec4 playerBullet, inout vec4 sniper ){\r
	if ( playerBullet.x > 0.0 && Collide( playerBullet.xy, BULLET_SIZE, sniper.xy, SNIPER_SIZE ) ){\r
        gExplosion		= vec4( sniper.xy + vec2( 0.0, SNIPER_SIZE.y * 0.5 ), 0.0, 0.0 );\r
        gHit		  	= vec4( playerBullet.xy, 0.0, 0.0 );\r
		sniper.x		= 0.0;\r
        playerBullet.x 	= 0.0;\r
    }\r
}\r
\r
void PlayerBulletTurretTest( inout vec4 playerBullet, inout vec4 turret, inout vec4 turretState ){\r
	if ( playerBullet.x > 0.0 && Collide( playerBullet.xy, BULLET_SIZE, turret.xy + vec2( 0.0, -TURRET_SIZE.y * 0.5 ), TURRET_SIZE ) ) {\r
        gHit			= vec4( playerBullet.xy, 0.0, 0.0 );\r
        playerBullet.x 	= 0.0;\r
        \r
        --turretState.x;        \r
        if ( turretState.x <= 0.0 ){\r
			gExplosion = vec4( turret.xy, 0.0, 0.0 );\r
        	turret.x = 0.0;\r
        }\r
    }\r
}\r
\r
void PlayerBulletPowerUpTest( inout vec4 playerBullet ){\r
	if ( playerBullet.x > 0.0 && gPowerUpState.x == STATE_RUN && Collide( playerBullet.xy, BULLET_SIZE, gPowerUp.xy, POWER_UP_SIZE ) ){\r
		gHit			= vec4( playerBullet.xy, 0.0, 0.0 );\r
        gExplosion 		= vec4( gPowerUp.xy + vec2( 0.0, POWER_UP_SIZE.y * 0.5 ), 0.0, 0.0 );        \r
        playerBullet.x 	= 0.0;\r
        gPowerUpState.x = STATE_JUMP;\r
        gPowerUp.z		= 1.0;\r
    }\r
}\r
\r
void PlayerBulletBossCoreTest( inout vec4 playerBullet ){\r
	if ( playerBullet.x > 0.0 && Collide( playerBullet.xy, BULLET_SIZE, gBossCore.xy + vec2( 0.0, BOSS_CORE_SIZE.y * 0.25 ), BOSS_CORE_SIZE * 0.5 ) ){\r
		gHit			= vec4( playerBullet.xy, 0.0, 0.0 );\r
        playerBullet.x 	= 0.0;\r
		--gBossCore.z;\r
        if ( gBossCore.z < 0.0 ){\r
            gExplosion 		= vec4( gBossCore.xy + vec2( 0.0, BOSS_CORE_SIZE.y * 0.5 ), 0.0, 0.0 );\r
            gBossCore.x 	= 0.0;\r
            gGameState.x 	= GAME_STATE_LEVEL_WIN;\r
			gGameState.y 	= 0.0;\r
        }\r
    }\r
}\r
\r
void PlayerBulletBossCannonTest( inout vec4 playerBullet, inout vec4 bossCannon ){\r
	if ( playerBullet.x > 0.0 && Collide( playerBullet.xy, BULLET_SIZE, bossCannon.xy, BOSS_CANNON_SIZE ) ){\r
		gHit			= vec4( playerBullet.xy, 0.0, 0.0 );\r
        playerBullet.x 	= 0.0;\r
		--bossCannon.w;\r
        if ( bossCannon.w < 0.0 ){\r
            gExplosion 		= vec4( bossCannon.xy + vec2( 0.0, BOSS_CANNON_SIZE.y * 0.5 ), 0.0, 0.0 );\r
            bossCannon.x 	= 0.0;\r
        }\r
    }\r
}\r
\r
void UpdatePlayerBullet( inout vec4 playerBullet, float screenWidth, float screenHeight ){\r
    if ( !Collide( playerBullet.xy, BULLET_SIZE, vec2( gCamera.x + screenWidth * 0.5, 0.0 ), vec2( screenWidth, screenHeight ) ) ){\r
        playerBullet.x = 0.0;\r
    }\r
    if ( playerBullet.x > 0.0 ){\r
    	playerBullet.xy += playerBullet.zw * PLAYER_BULLET_SPEED;\r
    }\r
}\r
\r
void PlayerHit( vec4 playerHitBox ){\r
#ifndef GOD_MODE\r
    if ( gGameState.x == GAME_STATE_LEVEL && gGameState.y > UI_GAME_START_TIME ){\r
        gPlayerState.x 	= STATE_JUMP;\r
        gPlayerState.y 	= 0.0;        \r
        gPlayerState.z 	= 1.0;\r
        gPlayerState.w -= 1.0;    \r
        gExplosion 		= vec4( gPlayer.xy + vec2( 0.0, playerHitBox.z * 0.5 ), 0.0, 0.0 );\r
        gPlayer 		= vec4( gCamera.x + 32.0 * 2.0 + 24.0, PLAYER_SPAWN_HEIGHT, PLAYER_SPAWN_HEIGHT, 0.0 );\r
        gPlayerDir		= vec4( 1.0, 0.0, 0.0, PLAYER_IMMORTALITY_LEN );\r
        gPlayerWeapon 	= vec4( WEAPON_RIFLE, 0.0, RIFLE_FIRE_RATE, RIFLE_BULLET_NUM );\r
\r
        if ( gPlayerState.w <= 0.0 ){\r
            gGameState.x 	= GAME_STATE_LEVEL_DIE;\r
            gGameState.y 	= 0.0;\r
            gPlayer			= vec4( 0.0, 1000000.0, 0.0, 0.0 );\r
            gPlayerState.x 	= STATE_FALL;\r
        }\r
    }\r
#endif\r
}\r
\r
void UpdateEnemyBullet( inout vec4 enemyBullet, vec4 playerHitBox, float screenWidth, float screenHeight ){\r
    if ( !Collide( enemyBullet.xy, BULLET_SIZE, vec2( gCamera.x + screenWidth * 0.5, 0.0 ), vec2( screenWidth, screenHeight ) ) ){\r
        enemyBullet.x = 0.0;\r
    }\r
    \r
	if ( enemyBullet.x > 0.0 ){\r
    	enemyBullet.xy += enemyBullet.zw * ENEMY_BULLET_SPEED;\r
    }\r
   \r
	if ( Collide( playerHitBox.xy, playerHitBox.zw, enemyBullet.xy, BULLET_SIZE ) ){\r
        PlayerHit( playerHitBox );\r
        enemyBullet.x = 0.0;\r
    }        \r
}\r
\r
void UpdateBossBullet( inout vec4 bossBullet, vec4 playerHitBox, float screenWidth, float screenHeight ){\r
    if ( !Collide( bossBullet.xy, POWER_BULLET_SIZE, vec2( gCamera.x + screenWidth * 0.5, 0.0 ), vec2( screenWidth, screenHeight ) ) ){\r
        bossBullet.x = 0.0;\r
    }\r
    \r
	if ( bossBullet.x > 0.0 ){\r
        bossBullet.xy += bossBullet.zw;\r
        bossBullet.w -= 1.0 / 10.0;\r
    }\r
   \r
	if ( Collide( playerHitBox.xy, playerHitBox.zw, bossBullet.xy, POWER_BULLET_SIZE ) ){\r
        PlayerHit( playerHitBox );\r
        bossBullet.x = 0.0;\r
    }        \r
}\r
\r
void UpdateSoldier( inout vec4 soldier, inout vec4 soldierState, vec4 playerHitBox, float screenWidth, float screenHeight ){\r
    float soldierSupport = GetSupport( soldier.xy );    \r
    if ( soldierState.x == STATE_RUN ){\r
		soldierState.y = mod( soldierState.y + ENEMY_ANIM_SPEED, 2.0 );        \r
        \r
        if ( soldier.y != soldierSupport ){\r
            // lost support - either jump or go back\r
            if ( Rand() > 0.3 )\r
            {\r
            	soldierState.x = STATE_JUMP;\r
            	soldierState.y = 1.0;\r
            	soldierState.z = 0.0;\r
			}\r
            else\r
            {\r
            	soldier.z = -soldier.z;\r
            }\r
        }\r
    }else if ( soldierState.x == STATE_JUMP ){\r
		soldierState.z += 1.0 / 20.0;\r
        soldier.y += 3.0 * ( 1.0 - soldierState.z );\r
        if ( soldierState.z > 1.0 && soldier.y <= soldierSupport )\r
        {\r
            soldier.y = soldierSupport;\r
            soldierState.x = STATE_RUN;\r
        }\r
    }\r
	soldier.x += soldier.z * ENEMY_RUN_SPEED;\r
\r
    if ( soldier.x > gCamera.x + screenWidth || soldier.x < gCamera.x ){\r
    	soldier.x = -1.0;        \r
    }\r
\r
    // soldier death\r
    if ( soldier.x > 0.0 && soldier.y < WATER_HEIGHT )   {\r
        gExplosion 	= vec4( soldier.xy + vec2( 0.0, SOLDIER_SIZE.y * 0.5 ), 0.0, 0.0 );\r
		soldier 	= vec4( 0.0, 0.0, 0.0, 0.0 );\r
    }\r
    \r
	if ( soldier.x > 0.0 && Collide( playerHitBox.xy, playerHitBox.zw, soldier.xy, SOLDIER_SIZE ) ){\r
        PlayerHit( playerHitBox );\r
    }    \r
}\r
\r
void main(){\r
    // don't compute gameplay outside of the data area\r
    if ( gl_FragCoord.x > 32.0 || gl_FragCoord.y > 32.0 ) {\r
    // if ( gl_FragCoord.x > 3200.0 || gl_FragCoord.y > 320.0 ) {\r
        discard;    \r
    }\r
\r
    float resMultX  	= floor( iResolution.x / NES_RES_X );\r
    float resMultY  	= floor( iResolution.y / NES_RES_Y );\r
    float resRcp		= 1.0 / max( min( resMultX, resMultY ), 1.0 );\r
    float screenWidth	= floor( iResolution.x * resRcp );\r
    float screenHeight	= floor( iResolution.y * resRcp );\r
    \r
    // keys\r
    bool keyLeft  	= customLeft > 1;\r
    bool keyRight 	= customRight> 1;\r
    bool keyUp  	= customUp > 1;\r
    bool keyDown 	= customDown > 1;    \r
    bool keyShoot	= customShoot> 1;\r
    bool keyJump 	= customJump > 1;\r
    \r
	gPlayer        	= LoadValue( txPlayer );\r
	gPlayerState   	= LoadValue( txPlayerState );\r
	gPlayerDir    	= LoadValue( txPlayerDir );\r
    gPlayerWeapon  	= LoadValue( txPlayerWeapon );\r
	gCamera       	= LoadValue( txCamera );\r
	gSoldier0     	= LoadValue( txSoldier0 );\r
    gSoldier1      	= LoadValue( txSoldier1 );\r
    gSoldier2      	= LoadValue( txSoldier2 );\r
	gSoldier0State 	= LoadValue( txSoldier0State );\r
    gSoldier1State 	= LoadValue( txSoldier1State );\r
    gSoldier2State 	= LoadValue( txSoldier2State );\r
	gSniper        	= LoadValue( txSniper );\r
	gPlayerBullet0 	= LoadValue( txPlayerBullet0 );\r
    gPlayerBullet1 	= LoadValue( txPlayerBullet1 );\r
    gPlayerBullet2 	= LoadValue( txPlayerBullet2 );\r
	gPlayerBullet3 	= LoadValue( txPlayerBullet3 );\r
    gPlayerBullet4 	= LoadValue( txPlayerBullet4 );\r
    gPlayerBullet5 	= LoadValue( txPlayerBullet5 );    \r
	gEnemyBullet0  	= LoadValue( txEnemyBullet0 );\r
	gEnemyBullet1  	= LoadValue( txEnemyBullet1 );\r
    gEnemyBullet2  	= LoadValue( txEnemyBullet2 );\r
    gEnemyBullet3  	= LoadValue( txEnemyBullet3 );\r
	gExplosion     	= LoadValue( txExplosion );\r
	gHit           	= LoadValue( txHit );\r
	gTurret0       	= LoadValue( txTurret0 );\r
	gTurret1       	= LoadValue( txTurret1 );\r
	gTurret0State   = LoadValue( txTurret0State );\r
	gTurret1State   = LoadValue( txTurret1State );    \r
    gPowerUp		= LoadValue( txPowerUp );\r
    gPowerUpState	= LoadValue( txPowerUpState );\r
    gBossCore		= LoadValue( txBossCore );\r
    gBossCannon0	= LoadValue( txBossCannon0 );\r
    gBossCannon1	= LoadValue( txBossCannon1 );\r
    gBossBullet0	= LoadValue( txBossBullet0 );\r
    gBossBullet1	= LoadValue( txBossBullet1 );\r
    gGameState		= LoadValue( txGameState );\r
    gBridge			= LoadValue( txBridge );\r
\r
    // game state machine\r
    ++gGameState.y;    \r
    if ( gGameState.x == GAME_STATE_TITLE ){\r
        if ( gGameState.y > UI_TITLE_TIME ){\r
            gGameState.x = GAME_STATE_LEVEL;\r
            gGameState.y = 0.0;\r
        }\r
    }else if ( gGameState.x == GAME_STATE_LEVEL ){\r
		if ( gGameState.y <= UI_GAME_START_TIME ){\r
        	gCamera 		= vec4( 32.0, -100.0, 0.0, 0.0 );\r
			gPlayer 		= vec4( gCamera.x + 32.0 * 2.0 + 24.0, PLAYER_SPAWN_HEIGHT, PLAYER_SPAWN_HEIGHT, 0.0 );\r
    		gPlayerState.x 	= STATE_JUMP;\r
        	gPlayerState.y 	= 0.0;        \r
        	gPlayerState.z 	= 1.0;\r
        	gPlayerState.w 	= PLAYER_LIFE_NUM;\r
        	gPlayerWeapon 	= vec4( WEAPON_RIFLE, 0.0, RIFLE_FIRE_RATE, RIFLE_BULLET_NUM );\r
        	gBossCore		= vec4( 32.0 * 108.0 + 23.0 + 12.0, 34.0, BOSS_CORE_HP, 0.0 );\r
            gBossCannon0	= vec4( 3478.0, 92.0, 0.0, BOSS_CANNON_HP );\r
            gBossCannon1	= gBossCannon0 + vec4( 22.0, 0.0, 0.0, 0.0 );\r
            gSoldier0		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gSoldier1		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gSoldier2		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gBridge			= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gPowerUp		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gTurret0		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
            gTurret1		= vec4( 0.0, 0.0, 0.0, 0.0 );\r
    	}\r
    }else if ( gGameState.x == GAME_STATE_LEVEL_DIE ){\r
        if ( gGameState.y > UI_TITLE_TIME ){\r
            gGameState.x = GAME_STATE_GAME_OVER;\r
            gGameState.y = 0.0;\r
        }\r
    } else if ( gGameState.x == GAME_STATE_LEVEL_WIN ){\r
        if ( gGameState.y > UI_TITLE_TIME ){\r
            gGameState.x = GAME_STATE_VICTORY;\r
            gGameState.y = 0.0;\r
        }\r
    }else if ( gGameState.x == GAME_STATE_VICTORY ){\r
        if ( gGameState.y > UI_VICTORY_TIME ){\r
            gGameState.x = GAME_STATE_TITLE;\r
            gGameState.y = 0.0;\r
        }\r
    } \r
	if ( gGameState.x == GAME_STATE_GAME_OVER ){\r
		if ( gGameState.y > UI_TITLE_TIME ){\r
            gGameState.x = GAME_STATE_TITLE;\r
            gGameState.y = 0.0;\r
        }\r
    }\r
\r
 \r
	UpdateSpawner( screenWidth );\r
        \r
    // player state machine\r
	float playerSupport = GetSupport( gPlayer.xy );\r
    if ( gPlayerState.x == STATE_RUN ){\r
        if ( keyJump ){\r
            gPlayer.z		= gPlayer.y;\r
            gPlayer.w		= 0.0;\r
	        gPlayerState.x 	= STATE_JUMP;\r
            gPlayerState.y 	= 0.0;\r
			gPlayerState.z 	= 0.0;\r
    	}else if ( keyRight || keyLeft ){\r
    		gPlayerState.y = mod( gPlayerState.y + PLAYER_RUN_ANIM_SPEED, 3.0 );\r
        }else{\r
            if ( keyDown ){\r
                gPlayerState.x = STATE_PRONE;\r
            }\r
            gPlayerState.y = 0.0;\r
        }\r
\r
        if ( gPlayer.y != playerSupport ){\r
			gPlayerState.x = STATE_FALL;\r
        }\r
        if ( gPlayer.y <= WATER_HEIGHT ){\r
            if ( gPlayer.x < WATER_END ){\r
            	gPlayerState.x = STATE_WATER;\r
            }else{\r
                PlayerHit( vec4( gPlayer.xy, BILL_PRONE_SIZE ) );\r
            }\r
        }\r
    }else if ( gPlayerState.x == STATE_PRONE ){\r
        if ( !keyDown || keyRight || keyLeft ){\r
            gPlayerState.x = STATE_RUN;\r
        }else if ( keyJump ){\r
     		gPlayerState.x = STATE_FALL;\r
        	gPlayer.y -= PLAYER_FALL_SPEED + 20.0;\r
		}        \r
    }else if ( gPlayerState.x == STATE_JUMP ){\r
        if ( keyRight ){\r
            gPlayer.w = 1.0;\r
        }else if ( keyLeft ){\r
            gPlayer.w = -1.0;\r
        }\r
        \r
        gPlayerState.y = mod( gPlayerState.y + PLAYER_JUMP_ANIM_SPEED, 2.0 );\r
		gPlayerState.z += 1.0 / 30.0;\r
        gPlayer.x += gPlayer.w * PLAYER_RUN_SPEED;\r
        gPlayer.y += 4.5 * ( 1.0 - gPlayerState.z );\r
        if ( gPlayerState.z > 1.0 && gPlayer.y <= playerSupport && gPlayer.y - gPlayer.z < PLAYER_JUMP_HEIGHT ){\r
            gPlayer.y = playerSupport;\r
            gPlayerState.x = STATE_RUN;\r
        }\r
    }else if ( gPlayerState.x == STATE_FALL ){\r
        if ( gPlayer.y <= playerSupport ){\r
            gPlayer.y = playerSupport;\r
            gPlayerState.x = STATE_RUN;\r
        }else{\r
            gPlayer.y -= PLAYER_FALL_SPEED;\r
        }\r
    }else if ( gPlayerState.x == STATE_WATER ){\r
        if ( keyDown ){\r
			gPlayerState.x = STATE_UNDER_WATER;\r
        }\r
        \r
		if ( playerSupport > WATER_HEIGHT ){\r
            gPlayerState.x 	= STATE_RUN;\r
            gPlayer.y		= playerSupport;\r
        }\r
    }else if ( gPlayerState.x == STATE_UNDER_WATER ){\r
        if ( !keyDown ){\r
        	gPlayerState.x = STATE_WATER;\r
        }\r
    }\r
    \r
    // importality tick\r
    --gPlayerDir.w;\r
    \r
    // look dir\r
    vec2 newDir;\r
    gPlayerDir.x = keyRight ? 1.0 : ( keyLeft ? -1.0 : 0.0 );\r
	gPlayerDir.y = keyUp 	? 1.0 : ( keyDown ? -1.0 : 0.0 );\r
    if ( ( gPlayerDir.x == 0.0 && gPlayerDir.y == 0.0 ) || gPlayerState.x == STATE_PRONE ){\r
        gPlayerDir.xy = gPlayerDir.z < 0.0 ? vec2( -1.0, 0.0 ) : vec2( 1.0, 0.0 );\r
    }\r
    \r
    // flip\r
    if ( keyRight && gPlayerState.x != STATE_UNDER_WATER ){\r
        gPlayerDir.z = 1.0;\r
    }else if ( keyLeft && gPlayerState.x != STATE_UNDER_WATER ){\r
        gPlayerDir.z = -1.0;\r
    }    \r
    \r
    // move\r
    if ( gPlayerState.x != STATE_PRONE && gPlayerState.x != STATE_UNDER_WATER && gPlayerState.x != STATE_JUMP ){\r
        if ( keyLeft ){\r
            gPlayer.x -= PLAYER_RUN_SPEED;\r
        }else if ( keyRight ){\r
            gPlayer.x += PLAYER_RUN_SPEED;\r
        }\r
    }\r
    \r
\r
    // clamp player to edge of the screen\r
    gPlayer.x = clamp( gPlayer.x, gCamera.x, PLAYER_END );\r
    \r
    // scroll camera\r
   	if ( gPlayer.x - screenWidth * 0.5 + 24.0 > gCamera.x ){\r
        gCamera.x = min( gPlayer.x - screenWidth * 0.5 + 24.0, CAMERA_END );\r
    }\r
        \r
    \r
    // player size and center\r
    vec4 playerHitBox = vec4( 0.0, 0.0, BILL_RUN_SIZE );\r
    vec2 playerWeaponOffset = gPlayerDir.y == 1.0 && gPlayerDir.x != 0.0 ? vec2( 6.0, 30.0 ) : ( gPlayerDir.y == 1.0 ? vec2( -2.0, 40.0 ) : ( gPlayerDir.y == -1.0 ? vec2( 7.0, 14.0 ) : vec2( 10.0, 19.0 ) ) );    \r
    if ( gPlayerState.x == STATE_PRONE ){\r
        playerHitBox.zw		= BILL_PRONE_SIZE;\r
        playerWeaponOffset 	= vec2( 14.0, 7.0 );\r
    }else if ( gPlayerState.x == STATE_JUMP ){    \r
        playerHitBox.zw 	= BILL_JUMP_SIZE;\r
        playerWeaponOffset 	= vec2( 0.0, BILL_JUMP_SIZE.y * 0.5 );\r
    }else if ( gPlayerState.x == STATE_WATER ){\r
        playerWeaponOffset.y -= 12.0;\r
    }\r
\r
    playerHitBox.x = gPlayer.x;\r
    playerHitBox.y = floor( gPlayer.y + playerHitBox.w * 0.5 * ( 1.0 - PLAYER_HIT_BOX_SIZE_MUL ) + 0.5 );\r
    playerHitBox.zw *= PLAYER_HIT_BOX_SIZE_MUL;\r
\r
    if ( gPlayerDir.w > 0.0 || gPlayerState.x == STATE_UNDER_WATER ){\r
    	// player is immortal        \r
        playerHitBox = vec4( -1000000.0 );\r
    }\r
\r
    playerWeaponOffset.x = gPlayerDir.z < 0.0 ? -playerWeaponOffset.x : playerWeaponOffset.x;\r
    vec2 playerWeapon = gPlayer.xy + playerWeaponOffset;\r
    vec2 playerTarget = gPlayer.xy + vec2( 0.0, BILL_RUN_SIZE.y * 0.5 );\r
    \r
    // player shooting\r
    ++gPlayerWeapon.y;\r
    float playerBulletNum = 	float( gPlayerBullet0.x > 0.0 ) \r
        					+ 	float( gPlayerBullet1.x > 0.0 )\r
    						+ 	float( gPlayerBullet2.x > 0.0 )\r
    						+ 	float( gPlayerBullet3.x > 0.0 )\r
    						+ 	float( gPlayerBullet4.x > 0.0 )\r
    						+ 	float( gPlayerBullet5.x > 0.0 );\r
\r
    if ( keyShoot && gPlayerWeapon.y > gPlayerWeapon.z && playerBulletNum < gPlayerWeapon.w && gPlayerState.x != STATE_UNDER_WATER ){\r
        gPlayerWeapon.y = 0.0;\r
        if ( gPlayerBullet0.x <= 0.0 ){\r
        	gPlayerBullet0.xy = playerWeapon;\r
            gPlayerBullet0.zw = normalize( gPlayerDir.xy );\r
        }else if ( gPlayerBullet1.x <= 0.0 ){\r
        	gPlayerBullet1.xy = playerWeapon;\r
            gPlayerBullet1.zw = normalize( gPlayerDir.xy );\r
        }else if ( gPlayerBullet2.x <= 0.0 ){\r
        	gPlayerBullet2.xy = playerWeapon;\r
            gPlayerBullet2.zw = normalize( gPlayerDir.xy );\r
        }else if ( gPlayerBullet3.x <= 0.0 ){\r
        	gPlayerBullet3.xy = playerWeapon;\r
            gPlayerBullet3.zw = normalize( gPlayerDir.xy );\r
        }else if ( gPlayerBullet4.x <= 0.0 ){\r
        	gPlayerBullet4.xy = playerWeapon;\r
            gPlayerBullet4.zw = normalize( gPlayerDir.xy );\r
        }else if ( gPlayerBullet5.x <= 0.0 ){\r
        	gPlayerBullet5.xy = playerWeapon;\r
            gPlayerBullet5.zw = normalize( gPlayerDir.xy );\r
        }          \r
    }\r
    \r
    UpdatePlayerBullet( gPlayerBullet0, screenWidth, screenHeight );\r
    UpdatePlayerBullet( gPlayerBullet1, screenWidth, screenHeight );\r
    UpdatePlayerBullet( gPlayerBullet2, screenWidth, screenHeight );\r
    UpdatePlayerBullet( gPlayerBullet3, screenWidth, screenHeight );\r
    UpdatePlayerBullet( gPlayerBullet4, screenWidth, screenHeight );\r
    UpdatePlayerBullet( gPlayerBullet5, screenWidth, screenHeight );    \r
    UpdateEnemyBullet( gEnemyBullet0, playerHitBox, screenWidth, screenHeight );\r
    UpdateEnemyBullet( gEnemyBullet1, playerHitBox, screenWidth, screenHeight );\r
    UpdateEnemyBullet( gEnemyBullet2, playerHitBox, screenWidth, screenHeight );\r
    UpdateEnemyBullet( gEnemyBullet3, playerHitBox, screenWidth, screenHeight );\r
    UpdateBossBullet( gBossBullet0, playerHitBox, screenWidth, screenHeight );\r
    UpdateBossBullet( gBossBullet1, playerHitBox, screenWidth, screenHeight );\r
    UpdateSoldier( gSoldier0, gSoldier0State, playerHitBox, screenWidth, screenHeight );\r
    UpdateSoldier( gSoldier1, gSoldier1State, playerHitBox, screenWidth, screenHeight );\r
    UpdateSoldier( gSoldier2, gSoldier2State, playerHitBox, screenWidth, screenHeight );\r
\r
    PlayerBulletSoldierTest( gPlayerBullet0, gSoldier0 );\r
    PlayerBulletSoldierTest( gPlayerBullet1, gSoldier0 );\r
    PlayerBulletSoldierTest( gPlayerBullet2, gSoldier0 );\r
    PlayerBulletSoldierTest( gPlayerBullet3, gSoldier0 );\r
    PlayerBulletSoldierTest( gPlayerBullet4, gSoldier0 );\r
    PlayerBulletSoldierTest( gPlayerBullet5, gSoldier0 );    \r
    \r
    PlayerBulletSoldierTest( gPlayerBullet0, gSoldier1 );\r
    PlayerBulletSoldierTest( gPlayerBullet1, gSoldier1 );\r
    PlayerBulletSoldierTest( gPlayerBullet2, gSoldier1 );\r
    PlayerBulletSoldierTest( gPlayerBullet3, gSoldier1 );\r
    PlayerBulletSoldierTest( gPlayerBullet4, gSoldier1 );\r
    PlayerBulletSoldierTest( gPlayerBullet5, gSoldier1 );    \r
    \r
    PlayerBulletSoldierTest( gPlayerBullet0, gSoldier2 );\r
    PlayerBulletSoldierTest( gPlayerBullet1, gSoldier2 );\r
    PlayerBulletSoldierTest( gPlayerBullet2, gSoldier2 );\r
    PlayerBulletSoldierTest( gPlayerBullet3, gSoldier2 );\r
    PlayerBulletSoldierTest( gPlayerBullet4, gSoldier2 );\r
    PlayerBulletSoldierTest( gPlayerBullet5, gSoldier2 );    \r
    \r
    PlayerBulletSniperTest( gPlayerBullet0, gSniper );\r
    PlayerBulletSniperTest( gPlayerBullet1, gSniper );\r
    PlayerBulletSniperTest( gPlayerBullet2, gSniper );\r
    PlayerBulletSniperTest( gPlayerBullet3, gSniper );\r
    PlayerBulletSniperTest( gPlayerBullet4, gSniper );\r
    PlayerBulletSniperTest( gPlayerBullet5, gSniper );    \r
    \r
    PlayerBulletTurretTest( gPlayerBullet0, gTurret0, gTurret0State );\r
    PlayerBulletTurretTest( gPlayerBullet1, gTurret0, gTurret0State );\r
    PlayerBulletTurretTest( gPlayerBullet2, gTurret0, gTurret0State );\r
    PlayerBulletTurretTest( gPlayerBullet3, gTurret0, gTurret0State );\r
    PlayerBulletTurretTest( gPlayerBullet4, gTurret0, gTurret0State );\r
    PlayerBulletTurretTest( gPlayerBullet5, gTurret0, gTurret0State );    \r
    \r
    PlayerBulletTurretTest( gPlayerBullet0, gTurret1, gTurret1State );\r
    PlayerBulletTurretTest( gPlayerBullet1, gTurret1, gTurret1State );\r
    PlayerBulletTurretTest( gPlayerBullet2, gTurret1, gTurret1State );\r
    PlayerBulletTurretTest( gPlayerBullet3, gTurret1, gTurret1State );\r
    PlayerBulletTurretTest( gPlayerBullet4, gTurret1, gTurret1State );\r
    PlayerBulletTurretTest( gPlayerBullet5, gTurret1, gTurret1State );    \r
    \r
    PlayerBulletPowerUpTest( gPlayerBullet0 );\r
    PlayerBulletPowerUpTest( gPlayerBullet1 );\r
    PlayerBulletPowerUpTest( gPlayerBullet2 );\r
    PlayerBulletPowerUpTest( gPlayerBullet3 );\r
    PlayerBulletPowerUpTest( gPlayerBullet4 );\r
    PlayerBulletPowerUpTest( gPlayerBullet5 );    \r
    \r
    PlayerBulletBossCoreTest( gPlayerBullet0 );\r
    PlayerBulletBossCoreTest( gPlayerBullet1 );\r
    PlayerBulletBossCoreTest( gPlayerBullet2 );\r
    PlayerBulletBossCoreTest( gPlayerBullet3 );\r
    PlayerBulletBossCoreTest( gPlayerBullet4 );\r
    PlayerBulletBossCoreTest( gPlayerBullet5 );  \r
    \r
    PlayerBulletBossCannonTest( gPlayerBullet0, gBossCannon0 );\r
    PlayerBulletBossCannonTest( gPlayerBullet1, gBossCannon0 );\r
    PlayerBulletBossCannonTest( gPlayerBullet2, gBossCannon0 );\r
    PlayerBulletBossCannonTest( gPlayerBullet3, gBossCannon0 );\r
    PlayerBulletBossCannonTest( gPlayerBullet4, gBossCannon0 );\r
	PlayerBulletBossCannonTest( gPlayerBullet5, gBossCannon0 );  \r
\r
    PlayerBulletBossCannonTest( gPlayerBullet0, gBossCannon1 );\r
    PlayerBulletBossCannonTest( gPlayerBullet1, gBossCannon1 );\r
    PlayerBulletBossCannonTest( gPlayerBullet2, gBossCannon1 );\r
    PlayerBulletBossCannonTest( gPlayerBullet3, gBossCannon1 );\r
    PlayerBulletBossCannonTest( gPlayerBullet4, gBossCannon1 );\r
	PlayerBulletBossCannonTest( gPlayerBullet5, gBossCannon1 );  	    \r
     \r
    \r
    // powerup state machine\r
	float powerUpSupport = GetSupport( gPowerUp.xy );    \r
    if ( gPowerUp.x > 0.0 ){\r
        if( gPowerUpState.x == STATE_RUN ){        \r
            gPowerUp.x += 2.0;\r
            gPowerUp.y = gPowerUpState.y + 32.0 * sin( 5.0 * iTime );\r
        }else if( gPowerUpState.x == STATE_JUMP ){\r
            gPowerUpState.z += 1.0 / 30.0;\r
            gPowerUp.x += 1.0;\r
            gPowerUp.y += 4.5 * ( 1.0 - gPowerUpState.z );\r
            if ( gPowerUpState.z > 1.0 && gPowerUp.y <= powerUpSupport ){\r
                if ( gPowerUp.y <= WATER_HEIGHT ){\r
                    gPowerUp.x = 0.0;\r
                    gExplosion = vec4( gPowerUp.xy + vec2( 0.0, POWER_UP_SIZE.y * 0.5 ), 0.0, 0.0 );\r
                }else{	\r
                    gPowerUp.y = powerUpSupport;\r
                	gPowerUpState.x = STATE_WATER;\r
                }\r
            } \r
        }\r
        \r
        if ( gPowerUpState.x != STATE_RUN ){\r
            if ( Collide( gPlayer.xy, BILL_RUN_SIZE, gPowerUp.xy, POWER_UP_SIZE ) ){\r
                gPowerUp.x 		= 0.0;\r
				gPlayerWeapon 	= vec4( WEAPON_MACHINE_GUN, 0.0, MACHINE_GUN_FIRE_RATE, MACHINE_GUN_BULLET_NUM );\r
            }  \r
        }\r
    }\r
    \r
    // first exploding bridge\r
    if ( gPlayer.x > BRIDGE_0_START_TILE * 32.0 - 16.0 && gBridge.x == 0.0 ){\r
        gBridge.x 	= BRIDGE_0_START_TILE;\r
        gBridge.y 	= 0.0;\r
        gExplosion 	= vec4( gBridge.x * 32.0 + 16.0, 16.0 * 6.0, 0.0, 0.0 );\r
    }\r
    if ( gBridge.x > 0.0 && gBridge.x < BRIDGE_0_END_TILE - 1.0 ){\r
        ++gBridge.y;\r
        if ( gBridge.y > BRIGDE_EXPLODE_TIME ) {\r
            ++gBridge.x;\r
            gBridge.y = 0.0;\r
            gExplosion = vec4( gBridge.x * 32.0 + 16.0, 16.0 * 6.0, 0.0, 0.0 );\r
        }\r
    }\r
    \r
    // second exploding bridge\r
    if ( gPlayer.x > BRIDGE_1_START_TILE * 32.0 - 16.0 && gBridge.x == BRIDGE_0_END_TILE - 1.0 ){\r
        gBridge.x 	= BRIDGE_1_START_TILE;\r
        gBridge.y 	= 0.0;\r
        gExplosion 	= vec4( gBridge.x * 32.0 + 16.0, 16.0 * 6.0, 0.0, 0.0 );\r
    }\r
    if ( gBridge.x >= BRIDGE_1_START_TILE - 1.0 && gBridge.x < BRIDGE_1_END_TILE - 1.0 ){\r
        ++gBridge.y;\r
        if ( gBridge.y > BRIGDE_EXPLODE_TIME ){\r
            ++gBridge.x;\r
            gBridge.y = 0.0;\r
            gExplosion = vec4( gBridge.x * 32.0 + 16.0, 16.0 * 6.0, 0.0, 0.0 );\r
        }\r
    }    \r
    \r
	UpdateSniper( gSniper, playerTarget );    \r
	UpdateTurret( gTurret0, gTurret0State, playerTarget );\r
    UpdateTurret( gTurret1, gTurret1State, playerTarget );\r
    UpdateBossCannon( gBossCannon0 );\r
    UpdateBossCannon( gBossCannon1 );\r
    \r
    // explosion\r
    if ( gExplosion.z >= 3.0 ){\r
        gExplosion.xy = vec2( 0.0 );\r
    }else{\r
        gExplosion.z += 0.2;\r
    }\r
    \r
    // hits\r
    if ( gHit.z >= 1.0 ){\r
		gHit.xy = vec2( 0.0 );\r
    }else{\r
        gHit.z += 0.2;\r
    }    \r
    \r
    gl_FragColor = vec4( 0.0 );\r
    StoreValue( txPlayer, gPlayer);\r
    StoreValue( txPlayerState, gPlayerState);\r
    StoreValue( txPlayerWeapon, gPlayerWeapon);\r
    StoreValue( txPlayerDir, gPlayerDir );\r
    StoreValue( txCamera, gCamera);\r
    StoreValue( txSoldier0, gSoldier0 );\r
    StoreValue( txSoldier1, gSoldier1);\r
    StoreValue( txSoldier2, gSoldier2 );\r
    StoreValue( txSoldier0State, gSoldier0State );\r
    StoreValue( txSoldier1State, gSoldier1State );\r
    StoreValue( txSoldier2State, gSoldier2State );\r
    StoreValue( txSniper, gSniper);\r
    StoreValue( txPlayerBullet0, gPlayerBullet0 );\r
    StoreValue( txPlayerBullet1, gPlayerBullet1 );\r
    StoreValue( txPlayerBullet2, gPlayerBullet2 );\r
    StoreValue( txPlayerBullet3, gPlayerBullet3 );\r
    StoreValue( txPlayerBullet4, gPlayerBullet4);\r
    StoreValue( txPlayerBullet5, gPlayerBullet5 );    \r
    StoreValue( txEnemyBullet0, gEnemyBullet0 );\r
    StoreValue( txEnemyBullet1, gEnemyBullet1 );\r
    StoreValue( txEnemyBullet2, gEnemyBullet2 );\r
    StoreValue( txEnemyBullet3, gEnemyBullet3 );\r
    StoreValue( txExplosion, gExplosion );\r
    StoreValue( txHit, gHit);\r
    StoreValue( txTurret0, gTurret0 );\r
    StoreValue( txTurret1, gTurret1 );\r
    StoreValue( txTurret0State, gTurret0State );\r
    StoreValue( txTurret1State, gTurret1State );    \r
    StoreValue( txPowerUp, gPowerUp );\r
    StoreValue( txPowerUpState, gPowerUpState );\r
    StoreValue( txBossCore, gBossCore );\r
    StoreValue( txBossCannon0, gBossCannon0 );\r
    StoreValue( txBossCannon1, gBossCannon1);\r
    StoreValue( txBossBullet0, gBossBullet0);\r
    StoreValue( txBossBullet1, gBossBullet1);    \r
    StoreValue( txGameState, gGameState);\r
    StoreValue( txBridge, gBridge);\r
\r
    // float green = customDown> 1 ? 1.0 : 0.0;\r
    \r
    // gl_FragColor = iFrame < 1 ? vec4( 1.0 ,green,0.0,1.0) : gl_FragColor;\r
    gl_FragColor = iFrame < 1 ? vec4( 1.0 ,0.0,0.0,1.0) : gl_FragColor;\r
}`,H=`// Background\r
\r
uniform vec3      iResolution;           // viewport resolution (in pixels)\r
uniform float     iTime;                 // shader playback time (in seconds)\r
uniform sampler2D iChannel0;         \r
\r
#define SPRITE_DEC_2( x, i ) mod( floor( i / pow( 2.0, mod( x, 24.0 ) ) ), 2.0 )\r
#define SPRITE_DEC_3( x, i ) mod( floor( i / pow( 4.0, mod( x, 11.0 ) ) ), 4.0 )\r
#define SPRITE_DEC_4( x, i ) mod( floor( i / pow( 4.0, mod( x, 8.0 ) ) ), 4.0 )\r
#define RGB( r, g, b ) vec3( float( r ) / 255.0, float( g ) / 255.0, float( b ) / 255.0 )\r
\r
const float NES_RES_X           = 224.0;\r
const float NES_RES_Y           = 192.0;\r
const float JUNGLE_START        = 32.0 * 52.0;\r
const float JUNGLE_END          = 32.0 * 108.0 + 16.0;\r
const float WATER_END           = 32.0 * 63.0;\r
const vec2  BOSS_CORE_SIZE      = vec2( 24.0, 31.0 );\r
const vec2  BOSS_CANNON_SIZE    = vec2( 14.0, 6.0 );\r
const float BRIDGE_0_START_TILE = 30.0;\r
const float BRIDGE_0_END_TILE   = 35.0;\r
const float BRIDGE_1_START_TILE = 40.0;\r
const float BRIDGE_1_END_TILE   = 45.0;\r
\r
// storage\r
const vec2 txPlayer 			= vec2( 0.0, 0.0 ); 	// xy - pos, z - jump start, w - jump dir\r
const vec2 txPlayerState		= vec2( 1.0, 0.0 ); 	// x - state, y - frame, z - jump tick, w - lifes\r
const vec2 txPlayerDir			= vec2( 2.0, 0.0 ); 	// xy - dir, z - flip, w - immortality\r
const vec2 txPlayerWeapon		= vec2( 3.0, 0.0 ); 	// x - weapon, y - weapon cooldown, z - weapon fire rate, w - weapon bullet num\r
const vec2 txCamera 			= vec2( 4.0, 0.0 ); 	// x - cam offset, y - spawn counter, z - soldier spawn counter\r
const vec2 txSoldier0 			= vec2( 5.0, 0.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier1 			= vec2( 5.0, 1.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier2 			= vec2( 5.0, 2.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier0State 		= vec2( 6.0, 0.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier1State 		= vec2( 6.0, 1.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier2State 		= vec2( 6.0, 2.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSniper	 			= vec2( 7.0, 0.0 ); 	// xy - pos, z - flip, w - weapon cooldown\r
const vec2 txPlayerBullet0 		= vec2( 8.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet1 		= vec2( 8.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet2 		= vec2( 8.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet3 		= vec2( 8.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet4 		= vec2( 8.0, 4.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet5 		= vec2( 8.0, 5.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet0 		= vec2( 9.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet1 		= vec2( 9.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet2 		= vec2( 9.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet3 		= vec2( 9.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txExplosion 			= vec2( 10.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txHit 				= vec2( 11.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txTurret0			= vec2( 12.0, 0.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret1			= vec2( 12.0, 1.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret0State		= vec2( 13.0, 0.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txTurret1State		= vec2( 13.0, 1.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txPowerUp			= vec2( 14.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txPowerUpState		= vec2( 15.0, 0.0 ); 	// x - state, y - initial height, z - jump tick\r
const vec2 txBossCore			= vec2( 16.0, 0.0 ); 	// xy - pos, z - HP\r
const vec2 txBossCannon0		= vec2( 17.0, 0.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossCannon1		= vec2( 17.0, 1.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossBullet0		= vec2( 18.0, 0.0 ); 	// xy - pos, zw - velocity\r
const vec2 txBossBullet1		= vec2( 18.0, 1.0 ); 	// xy - pos, zw - velocity\r
const vec2 txGameState			= vec2( 19.0, 0.0 ); 	// x - state, y - state tick\r
const vec2 txBridge				= vec2( 20.0, 0.0 ); 	// x - draw start, y - explode tick\r
\r
float Rand( vec2 co )\r
{\r
    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\r
}\r
\r
vec4 LoadValue( vec2 tx )\r
{\r
    return floor( texture( iChannel0, ( tx + 0.5 ) /  iResolution.xy) );\r
}\r
\r
void SpriteBush( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 8.0 ? ( x <= 10.0 ? 1419584.0 : ( x <= 21.0 ? 1.0 : 1360.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 10.0 ? 2796196.0 : ( x <= 21.0 ? 21.0 : 22176.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 10.0 ? 2796201.0 : ( x <= 21.0 ? 87125.0 : 87721.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 10.0 ? 2534058.0 : ( x <= 21.0 ? 436310.0 : 88681.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 10.0 ? 1681065.0 : ( x <= 21.0 ? 365637.0 : 71061.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 10.0 ? 1464937.0 : ( x <= 21.0 ? 91137.0 : 1381.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 10.0 ? 1332565.0 : ( x <= 21.0 ? 283908.0 : 266564.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 10.0 ? 332884.0 : ( x <= 21.0 ? 267328.0 : 65616.0 ) ) : idx;\r
\r
    idx = SPRITE_DEC_3( x, idx );\r
\r
    color = y >= 0.0 && y < 9.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 0,   144, 0 ) : color;\r
    color = idx == 2.0 ? RGB( 144, 213, 0 ) : color;\r
}\r
\r
void SpriteRockTop( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 7.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 89.0 : ( x <= 23.0 ? 0.0 : 341.0 ) ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 38144.0 : ( x <= 15.0 ? 5466.0 : ( x <= 23.0 ? 20480.0 : 5466.0 ) ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 43604.0 : ( x <= 15.0 ? 21851.0 : ( x <= 23.0 ? 42305.0 : 1386.0 ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 65168.0 : ( x <= 15.0 ? 21866.0 : ( x <= 23.0 ? 43345.0 : 1387.0 ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 47680.0 : ( x <= 15.0 ? 21914.0 : ( x <= 23.0 ? 64144.0 : 5547.0 ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 43269.0 : ( x <= 15.0 ? 5718.0 : ( x <= 23.0 ? 65188.0 : 5526.0 ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 20584.0 : ( x <= 15.0 ? 1.0 : ( x <= 23.0 ? 60329.0 : 22102.0 ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 5860.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 43769.0 : 22101.0 ) ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;\r
    \r
    color = x >= 0.0 && x < 32.0 && y >= 0.0 && y < 8.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 68,  80,  0 ) : color;\r
    color = idx == 2.0 ? RGB( 126, 126, 0 ) : color;\r
    color = idx == 3.0 ? RGB( 208, 190, 0 ) : color;\r
}\r
\r
void SpriteRock( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 31.0 ? ( x <= 7.0 ? 5860.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 43769.0 : 22101.0 ) ) ) : idx;\r
    idx = y == 30.0 ? ( x <= 7.0 ? 1444.0 : ( x <= 15.0 ? 1365.0 : ( x <= 23.0 ? 45049.0 : 22869.0 ) ) ) : idx;\r
    idx = y == 29.0 ? ( x <= 7.0 ? 17809.0 : ( x <= 15.0 ? 6826.0 : ( x <= 23.0 ? 32420.0 : 22869.0 ) ) ) : idx;\r
    idx = y == 28.0 ? ( x <= 7.0 ? 37201.0 : ( x <= 15.0 ? 27311.0 : ( x <= 23.0 ? 27284.0 : 25941.0 ) ) ) : idx;\r
    idx = y == 27.0 ? ( x <= 7.0 ? 57669.0 : ( x <= 15.0 ? 27327.0 : ( x <= 23.0 ? 43668.0 : 25941.0 ) ) ) : idx;\r
    idx = y == 26.0 ? ( x <= 7.0 ? 58373.0 : ( x <= 15.0 ? 43695.0 : ( x <= 23.0 ? 43601.0 : 38229.0 ) ) ) : idx;\r
    idx = y == 25.0 ? ( x <= 7.0 ? 63765.0 : ( x <= 15.0 ? 43695.0 : ( x <= 23.0 ? 43345.0 : 38230.0 ) ) ) : idx;\r
    idx = y == 24.0 ? ( x <= 7.0 ? 63764.0 : ( x <= 15.0 ? 43695.0 : ( x <= 23.0 ? 42322.0 : 38234.0 ) ) ) : idx;\r
    idx = y == 23.0 ? ( x <= 7.0 ? 63748.0 : ( x <= 15.0 ? 43695.0 : ( x <= 23.0 ? 42310.0 : 21866.0 ) ) ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 65088.0 : ( x <= 15.0 ? 43711.0 : ( x <= 23.0 ? 42266.0 : 5486.0 ) ) ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 65092.0 : ( x <= 15.0 ? 43711.0 : ( x <= 23.0 ? 37914.0 : 5566.0 ) ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 65088.0 : ( x <= 15.0 ? 43775.0 : ( x <= 23.0 ? 20570.0 : 5886.0 ) ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 65089.0 : ( x <= 15.0 ? 43775.0 : ( x <= 23.0 ? 20570.0 : 5881.0 ) ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 64145.0 : ( x <= 15.0 ? 44031.0 : ( x <= 23.0 ? 20570.0 : 1445.0 ) ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 43664.0 : ( x <= 15.0 ? 44031.0 : ( x <= 23.0 ? 16730.0 : 1429.0 ) ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 43664.0 : ( x <= 15.0 ? 44798.0 : ( x <= 23.0 ? 16730.0 : 18005.0 ) ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 44004.0 : ( x <= 15.0 ? 22266.0 : ( x <= 23.0 ? 16741.0 : 18005.0 ) ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 45049.0 : ( x <= 15.0 ? 21930.0 : ( x <= 23.0 ? 1381.0 : 1621.0 ) ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 49065.0 : ( x <= 15.0 ? 21930.0 : ( x <= 23.0 ? 1429.0 : 1365.0 ) ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 60073.0 : ( x <= 15.0 ? 21867.0 : ( x <= 23.0 ? 1429.0 : 340.0 ) ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 43689.0 : ( x <= 15.0 ? 21846.0 : ( x <= 23.0 ? 1109.0 : 340.0 ) ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 43690.0 : ( x <= 15.0 ? 21846.0 : ( x <= 23.0 ? 357.0 : 340.0 ) ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 38566.0 : ( x <= 15.0 ? 21849.0 : ( x <= 23.0 ? 1049.0 : 336.0 ) ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 25941.0 : ( x <= 15.0 ? 21849.0 : ( x <= 23.0 ? 4101.0 : 256.0 ) ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 25941.0 : ( x <= 15.0 ? 21861.0 : ( x <= 23.0 ? 1.0 : 21.0 ) ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 22868.0 : ( x <= 15.0 ? 23141.0 : ( x <= 23.0 ? 20480.0 : 361.0 ) ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 21840.0 : ( x <= 15.0 ? 5525.0 : ( x <= 23.0 ? 42240.0 : 5546.0 ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 20800.0 : ( x <= 15.0 ? 5377.0 : ( x <= 23.0 ? 64080.0 : 1451.0 ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 4096.0 : ( x <= 15.0 ? 1024.0 : ( x <= 23.0 ? 65428.0 : 1391.0 ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 16464.0 : ( x <= 15.0 ? 1024.0 : ( x <= 23.0 ? 65188.0 : 5531.0 ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 5541.0 : ( x <= 15.0 ? 4097.0 : ( x <= 23.0 ? 60069.0 : 5526.0 ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 23288.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 43705.0 : 22101.0 ) ) ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;\r
    \r
    color = x >= 0.0 && x < 32.0 && y >= 0.0 && y < 32.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 68,  80,  0 ) : color;\r
    color = idx == 2.0 ? RGB( 126, 126, 0 ) : color;\r
    color = idx == 3.0 ? RGB( 208, 190, 0 ) : color;\r
}\r
\r
void SpriteTreeTrunk( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 1.0 ? 2918701.0 : idx;\r
    idx = y == 0.0 ? 1263122.0 : idx;\r
    \r
    idx = SPRITE_DEC_2( x, idx );\r
    \r
    color = idx == 1.0 ? RGB( 64,  44,  0 ) : RGB( 0,  0,  0 );\r
}\r
\r
void SpriteTreeStart( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
	idx = y == 22.0 ? 32768.0 : idx;\r
	idx = y == 21.0 ? 10240.0 : idx;\r
	idx = y == 20.0 ? 9088.0 : idx;\r
	idx = y == 19.0 ? 10976.0 : idx;\r
	idx = y == 18.0 ? 9016.0 : idx;\r
	idx = y == 17.0 ? 33580.0 : idx;\r
	idx = y == 16.0 ? 2874.0 : idx;\r
	idx = y == 15.0 ? 41644.0 : idx;\r
	idx = y == 14.0 ? 13240.0 : idx;\r
	idx = y == 13.0 ? 824.0 : idx;\r
	idx = y == 12.0 ? 4128.0 : idx;\r
	idx = y == 11.0 ? 17408.0 : idx;\r
	idx = y == 10.0 ? 1024.0 : idx;\r
	idx = y == 9.0 ? 34048.0 : idx;\r
	idx = y == 8.0 ? 33024.0 : idx;\r
	idx = y == 7.0 ? 0.0 : idx;\r
	idx = y == 6.0 ? 51840.0 : idx;\r
	idx = y == 5.0 ? 44000.0 : idx;\r
	idx = y == 4.0 ? 1760.0 : idx;\r
	idx = y == 3.0 ? 17584.0 : idx;\r
	idx = y == 2.0 ? 17440.0 : idx;\r
	idx = y == 1.0 ? 17440.0 : idx;\r
	idx = y == 0.0 ? 16384.0 : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 8.0 ? idx : 0.0;\r
\r
    color = x >= 0.0 && x < 8.0 && y >= 0.0 && y < 24.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 64, 44, 0 ) : color;\r
    color = idx == 2.0 ? RGB( 0, 148, 0 ) : color;    \r
    color = idx == 3.0 ? RGB( 128, 208, 16 ) : color;\r
}\r
\r
void SpriteTreeMiddle( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 23.0 ? ( x <= 7.0 ? 10240.0 : 0.0 ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 48770.0 : 2688.0 ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 10283.0 : 12266.0 ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 32959.0 : 48059.0 ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 58080.0 : 44782.0 ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 35470.0 : 12012.0 ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 8763.0 : 2248.0 ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 35723.0 : 32898.0 ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 11835.0 : 57866.0 ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 15155.0 : 57896.0 ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 60450.0 : 45240.0 ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 60480.0 : 8930.0 ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 60481.0 : 930.0 ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 51280.0 : 4738.0 ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 49234.0 : 4226.0 ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 32848.0 : 4096.0 ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 32852.0 : 16416.0 ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 23.0 : 18528.0 ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 30.0 : 18536.0 ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 17464.0 : 18536.0 ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 1064.0 : 18504.0 ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 1312.0 : 16448.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 17668.0 : 18496.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 16660.0 : 16448.0 ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 16.0 ? idx : 0.0;\r
\r
    color = x >= 0.0 && x < 16.0 && y >= 0.0 && y < 24.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 64, 44, 0 ) : color;\r
    color = idx == 2.0 ? RGB( 0, 148, 0 ) : color;    \r
    color = idx == 3.0 ? RGB( 128, 208, 16 ) : color;\r
}\r
\r
void SpriteTreeEnd( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
	idx = y == 17.0 ? 960.0 : idx;\r
	idx = y == 16.0 ? 2744.0 : idx;\r
	idx = y == 15.0 ? 8227.0 : idx;\r
	idx = y == 14.0 ? 3022.0 : idx;\r
	idx = y == 13.0 ? 48674.0 : idx;\r
	idx = y == 12.0 ? 41136.0 : idx;\r
	idx = y == 11.0 ? 52192.0 : idx;\r
	idx = y == 10.0 ? 36516.0 : idx;\r
	idx = y == 9.0 ? 15140.0 : idx;\r
	idx = y == 8.0 ? 15108.0 : idx;\r
	idx = y == 7.0 ? 12292.0 : idx;\r
	idx = y == 6.0 ? 8452.0 : idx;\r
	idx = y == 5.0 ? 68.0 : idx;\r
	idx = y == 4.0 ? 68.0 : idx;\r
	idx = y == 3.0 ? 68.0 : idx;\r
	idx = y == 2.0 ? 20.0 : idx;\r
	idx = y == 1.0 ? 20.0 : idx;\r
	idx = y == 0.0 ? 20.0 : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 8.0 ? idx : 0.0;\r
\r
    color = x >= 0.0 && x < 8.0 && y >= 0.0 && y < 24.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 64, 44, 0 ) : color;\r
    color = idx == 2.0 ? RGB( 0, 148, 0 ) : color;    \r
    color = idx == 3.0 ? RGB( 128, 208, 16 ) : color;\r
}\r
\r
void SpriteBridge( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
	idx = y == 26.0 ? ( x <= 10.0 ? 349509.0 : ( x <= 21.0 ? 1381717.0 : 349269.0 ) ) : idx;\r
	idx = y == 25.0 ? ( x <= 10.0 ? 349573.0 : ( x <= 21.0 ? 1447254.0 : 350293.0 ) ) : idx;\r
	idx = y == 24.0 ? ( x <= 10.0 ? 2184545.0 : ( x <= 21.0 ? 1410389.0 : 349717.0 ) ) : idx;\r
	idx = y == 23.0 ? ( x <= 10.0 ? 2184545.0 : ( x <= 21.0 ? 1410389.0 : 349717.0 ) ) : idx;\r
	idx = y == 22.0 ? ( x <= 10.0 ? 1594712.0 : ( x <= 21.0 ? 1401173.0 : 349573.0 ) ) : idx;\r
	idx = y == 21.0 ? ( x <= 10.0 ? 1594712.0 : ( x <= 21.0 ? 1401173.0 : 349573.0 ) ) : idx;\r
	idx = y == 20.0 ? ( x <= 10.0 ? 2730665.0 : ( x <= 21.0 ? 2795178.0 : 699034.0 ) ) : idx;\r
	idx = y == 19.0 ? ( x <= 10.0 ? 1594712.0 : ( x <= 21.0 ? 1398101.0 : 349573.0 ) ) : idx;\r
	idx = y == 18.0 ? ( x <= 10.0 ? 546136.0 : ( x <= 21.0 ? 0.0 : 349576.0 ) ) : idx;\r
	idx = y == 17.0 ? ( x <= 10.0 ? 524288.0 : ( x <= 21.0 ? 0.0 : 8.0 ) ) : idx;\r
	idx = y == 16.0 ? ( x <= 10.0 ? 567976.0 : ( x <= 21.0 ? 0.0 : 699016.0 ) ) : idx;\r
	idx = y == 15.0 ? ( x <= 10.0 ? 2643288.0 : ( x <= 21.0 ? 2796202.0 : 349578.0 ) ) : idx;\r
	idx = y == 14.0 ? ( x <= 10.0 ? 1594712.0 : ( x <= 21.0 ? 1398101.0 : 349573.0 ) ) : idx;\r
	idx = y == 11.0 ? ( x <= 10.0 ? 26729.0 : ( x <= 21.0 ? 2204672.0 : 6.0 ) ) : idx;\r
	idx = y == 10.0 ? ( x <= 10.0 ? 5140.0 : ( x <= 21.0 ? 1069056.0 : 1.0 ) ) : idx;\r
	idx = y == 9.0 ? ( x <= 10.0 ? 1397865.0 : ( x <= 21.0 ? 1156437.0 : 349525.0 ) ) : idx;\r
	idx = y == 8.0 ? ( x <= 10.0 ? 2791700.0 : ( x <= 21.0 ? 2380458.0 : 699049.0 ) ) : idx;\r
	idx = y == 7.0 ? ( x <= 10.0 ? 1393769.0 : ( x <= 21.0 ? 1156437.0 : 349524.0 ) ) : idx;\r
	idx = y == 6.0 ? ( x <= 10.0 ? 20.0 : ( x <= 21.0 ? 20480.0 : 0.0 ) ) : idx;\r
	idx = y == 5.0 ? ( x <= 10.0 ? 105.0 : ( x <= 21.0 ? 107520.0 : 0.0 ) ) : idx;\r
	idx = y == 4.0 ? ( x <= 10.0 ? 20.0 : ( x <= 21.0 ? 20480.0 : 0.0 ) ) : idx;\r
	idx = y == 3.0 ? ( x <= 10.0 ? 1398149.0 : ( x <= 21.0 ? 1447253.0 : 349525.0 ) ) : idx;\r
	idx = y == 2.0 ? ( x <= 10.0 ? 2796193.0 : ( x <= 21.0 ? 2786986.0 : 699050.0 ) ) : idx;\r
	idx = y == 1.0 ? ( x <= 10.0 ? 1398113.0 : ( x <= 21.0 ? 1410389.0 : 349525.0 ) ) : idx;\r
	idx = y == 0.0 ? ( x <= 10.0 ? 1398085.0 : ( x <= 21.0 ? 1381717.0 : 349525.0 ) ) : idx;  \r
\r
    idx = SPRITE_DEC_3( x, idx );\r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;\r
    \r
    color = x >= 0.0 && x < 32.0 && y >= 0.0 && y < 13.0 ? RGB( 0, 0, 0 ) : color;\r
    \r
    float blink = abs( sin( iTime * 3.0 ) ) + 0.5;\r
    color = x >= 12.0 && x < 24.0 && y >= 17.0 && y < 19.0 ? blink * RGB( 228, 68, 52 ) : color;\r
    color = idx == 1.0 ? RGB( 179, 179, 179 ) : color;\r
    color = idx == 2.0 ? RGB( 255, 255, 255 ) : color;    \r
}\r
\r
void SpriteGrass( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 15.0 ? ( x <= 10.0 ? 1398096.0 : ( x <= 21.0 ? 1398101.0 : 87381.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 10.0 ? 1398101.0 : ( x <= 21.0 ? 1398101.0 : 349525.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 10.0 ? 1398101.0 : ( x <= 21.0 ? 1398101.0 : 349525.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 10.0 ? 1398101.0 : ( x <= 21.0 ? 1398101.0 : 349525.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 10.0 ? 1398102.0 : ( x <= 21.0 ? 1398101.0 : 349525.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 10.0 ? 1418921.0 : ( x <= 21.0 ? 1398102.0 : 419158.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 10.0 ? 2779749.0 : ( x <= 21.0 ? 2796202.0 : 285353.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 10.0 ? 2796197.0 : ( x <= 21.0 ? 2791078.0 : 345494.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 10.0 ? 1681049.0 : ( x <= 21.0 ? 1468826.0 : 70997.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 10.0 ? 2517412.0 : ( x <= 21.0 ? 2463126.0 : 280153.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 10.0 ? 1681057.0 : ( x <= 21.0 ? 2459241.0 : 71013.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 10.0 ? 2468240.0 : ( x <= 21.0 ? 1448218.0 : 267413.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 10.0 ? 1137172.0 : ( x <= 21.0 ? 332905.0 : 20818.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 10.0 ? 1148161.0 : ( x <= 21.0 ? 332900.0 : 325.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 10.0 ? 16640.0 : ( x <= 21.0 ? 69648.0 : 68.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_3( x, idx );\r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;\r
\r
    color = x >= 0.0 && x < 32.0 && y >= 0.0 && y < 16.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 0,   144, 0 ) : color;\r
    color = idx == 2.0 ? RGB( 144, 213, 0 ) : color;\r
}\r
\r
void SpriteLeaves( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 29.0 ? ( x <= 7.0 ? 8224.0 : ( x <= 15.0 ? 514.0 : ( x <= 23.0 ? 10400.0 : 41122.0 ) ) ) : idx;\r
    idx = y == 28.0 ? ( x <= 7.0 ? 35330.0 : ( x <= 15.0 ? 2110.0 : ( x <= 23.0 ? 14496.0 : 35723.0 ) ) ) : idx;\r
    idx = y == 27.0 ? ( x <= 7.0 ? 41090.0 : ( x <= 15.0 ? 995.0 : ( x <= 23.0 ? 12996.0 : 11788.0 ) ) ) : idx;\r
    idx = y == 26.0 ? ( x <= 7.0 ? 14466.0 : ( x <= 15.0 ? 3595.0 : ( x <= 23.0 ? 58256.0 : 14380.0 ) ) ) : idx;\r
    idx = y == 25.0 ? ( x <= 7.0 ? 36352.0 : ( x <= 15.0 ? 2223.0 : ( x <= 23.0 ? 57860.0 : 47928.0 ) ) ) : idx;\r
    idx = y == 24.0 ? ( x <= 7.0 ? 58240.0 : ( x <= 15.0 ? 8958.0 : ( x <= 23.0 ? 57424.0 : 64312.0 ) ) ) : idx;\r
    idx = y == 23.0 ? ( x <= 7.0 ? 47810.0 : ( x <= 15.0 ? 2956.0 : ( x <= 23.0 ? 12288.0 : 51772.0 ) ) ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 14338.0 : ( x <= 15.0 ? 3631.0 : ( x <= 23.0 ? 0.0 : 52012.0 ) ) ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 35842.0 : ( x <= 15.0 ? 2091.0 : ( x <= 23.0 ? 10250.0 : 776.0 ) ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 51200.0 : ( x <= 15.0 ? 50.0 : ( x <= 23.0 ? 8352.0 : 712.0 ) ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 34818.0 : ( x <= 15.0 ? 40992.0 : ( x <= 23.0 ? 43650.0 : 32896.0 ) ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 40.0 : ( x <= 15.0 ? 2048.0 : ( x <= 23.0 ? 552.0 : 2570.0 ) ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 128.0 : ( x <= 15.0 ? 11256.0 : ( x <= 23.0 ? 8367.0 : 8232.0 ) ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 42.0 : ( x <= 15.0 ? 64010.0 : ( x <= 23.0 ? 35458.0 : 35328.0 ) ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 128.0 : ( x <= 15.0 ? 44960.0 : ( x <= 23.0 ? 34863.0 : 49282.0 ) ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 32783.0 : ( x <= 15.0 ? 3055.0 : ( x <= 23.0 ? 12472.0 : 63522.0 ) ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 63544.0 : ( x <= 15.0 ? 63738.0 : ( x <= 23.0 ? 58080.0 : 52736.0 ) ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 11778.0 : ( x <= 15.0 ? 33772.0 : ( x <= 23.0 ? 52111.0 : 50050.0 ) ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 49195.0 : ( x <= 15.0 ? 16014.0 : ( x <= 23.0 ? 2606.0 : 45187.0 ) ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 64686.0 : ( x <= 15.0 ? 14383.0 : ( x <= 23.0 ? 3128.0 : 60419.0 ) ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 11020.0 : ( x <= 15.0 ? 57599.0 : ( x <= 23.0 ? 3248.0 : 58114.0 ) ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 35532.0 : ( x <= 15.0 ? 50419.0 : ( x <= 23.0 ? 35040.0 : 12800.0 ) ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 57480.0 : ( x <= 15.0 ? 50050.0 : ( x <= 23.0 ? 227.0 : 12304.0 ) ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 45232.0 : ( x <= 15.0 ? 35595.0 : ( x <= 23.0 ? 131.0 : 8257.0 ) ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 59428.0 : ( x <= 15.0 ? 3640.0 : ( x <= 23.0 ? 258.0 : 20.0 ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 35361.0 : ( x <= 15.0 ? 10272.0 : ( x <= 23.0 ? 1104.0 : 32833.0 ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 33284.0 : ( x <= 15.0 ? 8354.0 : ( x <= 23.0 ? 261.0 : 8212.0 ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 1105.0 : ( x <= 15.0 ? 8706.0 : ( x <= 23.0 ? 1104.0 : 10305.0 ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 260.0 : ( x <= 15.0 ? 532.0 : ( x <= 23.0 ? 261.0 : 8212.0 ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 1105.0 : ( x <= 15.0 ? 16449.0 : ( x <= 23.0 ? 1104.0 : 2113.0 ) ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
\r
    color = RGB( 0, 0, 0 );\r
    color = idx == 1.0 ? RGB( 64,  44,  0  ) : color;\r
    color = idx == 2.0 ? RGB( 0,   148, 0  ) : color;    \r
    color = idx == 3.0 ? RGB( 128, 208, 16 ) : color;\r
}\r
\r
void SpriteShoreSide( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
	idx = y == 19.0 ? 43.0 : idx;\r
	idx = y == 18.0 ? 190.0 : idx;\r
	idx = y == 17.0 ? 2025.0 : idx;\r
	idx = y == 16.0 ? 3773.0 : idx;\r
	idx = y == 15.0 ? 3050.0 : idx;\r
	idx = y == 14.0 ? 445.0 : idx;\r
	idx = y == 13.0 ? 2981.0 : idx;\r
	idx = y == 12.0 ? 765.0 : idx;\r
	idx = y == 11.0 ? 4005.0 : idx;\r
	idx = y == 10.0 ? 6869.0 : idx;\r
	idx = y == 9.0 ? 3669.0 : idx;\r
	idx = y == 8.0 ? 15189.0 : idx;\r
	idx = y == 7.0 ? 3029.0 : idx;\r
	idx = y == 6.0 ? 16037.0 : idx;\r
	idx = y == 5.0 ? 11221.0 : idx;\r
	idx = y == 4.0 ? 32341.0 : idx;\r
	idx = y == 3.0 ? 43989.0 : idx;\r
	idx = y == 2.0 ? 64853.0 : idx;\r
	idx = y == 1.0 ? 22869.0 : idx;\r
	idx = y == 0.0 ? 21850.0 : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
    float blink = fract( iTime * 3.0 );\r
    idx = blink > 0.5 && ( idx == 2.0 || idx == 3.0 ) ? 5.0 - idx : idx;\r
    \r
    color = y >= 0.0 && y < 20.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 0,   112, 236 ) : color;\r
    color = idx == 2.0 ? RGB( 60,  188, 252 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteShore( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 6.0 ? 0.0 : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 65024.0 : ( x <= 15.0 ? 2.0 : ( x <= 23.0 ? 760.0 : 188.0 ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 43904.0 : ( x <= 15.0 ? 60143.0 : ( x <= 23.0 ? 2990.0 : 3051.0 ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 24303.0 : ( x <= 15.0 ? 49061.0 : ( x <= 23.0 ? 48789.0 : 61095.0 ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 21926.0 : ( x <= 15.0 ? 21909.0 : ( x <= 23.0 ? 58709.0 : 42902.0 ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 38229.0 : ( x <= 15.0 ? 22869.0 : ( x <= 23.0 ? 21845.0 : 21925.0 ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 21865.0 : ( x <= 15.0 ? 22137.0 : 21845.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
    float blink = fract( iTime * 3.0 );\r
    idx = blink > 0.5 && ( idx == 2.0 || idx == 3.0 ) ? 5.0 - idx : idx;\r
    \r
    color = RGB( 0, 0, 0 );\r
    color = idx == 1.0 ? RGB( 0,   112, 236 ) : color;\r
    color = idx == 2.0 ? RGB( 60,  188, 252 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteBossCore( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 30.0 ? ( x <= 7.0 ? 21844.0 : ( x <= 15.0 ? 85.0 : 0.0 ) ) : idx;\r
    idx = y == 29.0 ? ( x <= 7.0 ? 65533.0 : ( x <= 15.0 ? 21845.0 : 5461.0 ) ) : idx;\r
    idx = y == 28.0 ? ( x <= 7.0 ? 43689.0 : ( x <= 15.0 ? 65345.0 : 28671.0 ) ) : idx;\r
    idx = y == 27.0 ? ( x <= 7.0 ? 43689.0 : ( x <= 15.0 ? 43861.0 : 21930.0 ) ) : idx;\r
    idx = y == 26.0 ? ( x <= 7.0 ? 43685.0 : ( x <= 15.0 ? 43841.0 : 21610.0 ) ) : idx;\r
    idx = y == 25.0 ? ( x <= 7.0 ? 43665.0 : ( x <= 15.0 ? 43861.0 : 21850.0 ) ) : idx;\r
    idx = y == 24.0 ? ( x <= 7.0 ? 43605.0 : ( x <= 15.0 ? 43841.0 : 27462.0 ) ) : idx;\r
    idx = y == 23.0 ? ( x <= 7.0 ? 43293.0 : ( x <= 15.0 ? 43861.0 : 27605.0 ) ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 42361.0 : ( x <= 15.0 ? 27457.0 : 23476.0 ) ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 20969.0 : ( x <= 15.0 ? 23381.0 : 27565.0 ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 38825.0 : ( x <= 15.0 ? 17855.0 : 23467.0 ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 26281.0 : ( x <= 15.0 ? 55009.0 : 27562.0 ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 26276.0 : ( x <= 15.0 ? 38592.0 : 32746.0 ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 22928.0 : ( x <= 15.0 ? 39808.0 : 23162.0 ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 6544.0 : ( x <= 15.0 ? 39808.0 : 23390.0 ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 6544.0 : ( x <= 15.0 ? 39808.0 : 23390.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 6544.0 : ( x <= 15.0 ? 39808.0 : 23390.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 6564.0 : ( x <= 15.0 ? 39808.0 : 23390.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 22953.0 : ( x <= 15.0 ? 39808.0 : 23162.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 26281.0 : ( x <= 15.0 ? 38592.0 : 32746.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 26281.0 : ( x <= 15.0 ? 38625.0 : 27562.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 38569.0 : ( x <= 15.0 ? 17850.0 : 23466.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 20905.0 : ( x <= 15.0 ? 24405.0 : 27561.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 46441.0 : ( x <= 15.0 ? 27457.0 : 23460.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 44313.0 : ( x <= 15.0 ? 43861.0 : 27541.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 43861.0 : ( x <= 15.0 ? 43841.0 : 27462.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 43729.0 : ( x <= 15.0 ? 43861.0 : 21850.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 45045.0 : ( x <= 15.0 ? 43841.0 : 21610.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 62804.0 : ( x <= 15.0 ? 65365.0 : 21930.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 21845.0 : 27391.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 20480.0 : 5461.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 24.0 ? idx : 0.0;\r
\r
    float blink = abs( sin( iTime * 3.0 ) ) + 0.5;\r
    color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 192, 192, 192 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
    color = idx == 0.0 && x >= 1.0 && x < 21.0 && y >= 3.0 && y < 30.0 ? blink * RGB( 228, 68, 52 ) : color;\r
}\r
\r
void SpriteBossCannonBase( inout vec3 color, float x, float y )\r
{\r
	float idx = 0.0;\r
    \r
	idx = y == 41.0 ? ( x <= 7.0 ? 11606.0 : ( x <= 15.0 ? 395.0 : ( x <= 23.0 ? 43584.0 : 21946.0 ) ) ) : idx;\r
	idx = y == 40.0 ? ( x <= 7.0 ? 11611.0 : ( x <= 15.0 ? 32774.0 : ( x <= 23.0 ? 43595.0 : 22250.0 ) ) ) : idx;\r
	idx = y == 39.0 ? ( x <= 7.0 ? 6491.0 : ( x <= 15.0 ? 11520.0 : ( x <= 23.0 ? 43298.0 : 22250.0 ) ) ) : idx;\r
	idx = y == 38.0 ? ( x <= 7.0 ? 366.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 43275.0 : 23466.0 ) ) ) : idx;\r
	idx = y == 37.0 ? ( x <= 7.0 ? 5486.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 42082.0 : 43946.0 ) ) ) : idx;\r
	idx = y == 36.0 ? ( x <= 7.0 ? 5562.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 41995.0 : 21850.0 ) ) ) : idx;\r
	idx = y == 35.0 ? ( x <= 7.0 ? 5866.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 20578.0 : 5.0 ) ) ) : idx;\r
	idx = y == 34.0 ? ( x <= 7.0 ? 5866.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 11.0 : 27744.0 ) ) ) : idx;\r
	idx = y == 33.0 ? ( x <= 7.0 ? 11178.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 32.0 ? ( x <= 7.0 ? 5466.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 31.0 ? ( x <= 7.0 ? 21.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 30.0 ? ( x <= 7.0 ? 11264.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 29.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 28.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 27.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 21612.0 ) ) ) : idx;\r
	idx = y == 26.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 20491.0 : 84.0 ) ) ) : idx;\r
	idx = y == 25.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 98.0 : 27648.0 ) ) ) : idx;\r
	idx = y == 24.0 ? ( x <= 7.0 ? 5228.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 23.0 ? ( x <= 7.0 ? 84.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 22.0 ? ( x <= 7.0 ? 11264.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 21.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 20.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 19.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 21612.0 ) ) ) : idx;\r
	idx = y == 18.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 20491.0 : 84.0 ) ) ) : idx;\r
	idx = y == 17.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 98.0 : 27648.0 ) ) ) : idx;\r
	idx = y == 16.0 ? ( x <= 7.0 ? 5228.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 15.0 ? ( x <= 7.0 ? 11348.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 27756.0 ) ) ) : idx;\r
	idx = y == 14.0 ? ( x <= 7.0 ? 11264.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 11372.0 ) ) ) : idx;\r
	idx = y == 13.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 35948.0 ) ) ) : idx;\r
	idx = y == 12.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 24587.0 : 34924.0 ) ) ) : idx;\r
	idx = y == 11.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 24674.0 : 57452.0 ) ) ) : idx;\r
	idx = y == 10.0 ? ( x <= 7.0 ? 11372.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 20491.0 : 57428.0 ) ) ) : idx;\r
	idx = y == 9.0 ? ( x <= 7.0 ? 5228.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 98.0 : 47104.0 ) ) ) : idx;\r
	idx = y == 8.0 ? ( x <= 7.0 ? 108.0 : ( x <= 15.0 ? 35042.0 : ( x <= 23.0 ? 4107.0 : 47125.0 ) ) ) : idx;\r
	idx = y == 7.0 ? ( x <= 7.0 ? 84.0 : ( x <= 15.0 ? 11532.0 : ( x <= 23.0 ? 98.0 : 44544.0 ) ) ) : idx;\r
	idx = y == 6.0 ? ( x <= 7.0 ? 16128.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 0.0 : 45044.0 ) ) ) : idx;\r
	idx = y == 5.0 ? ( x <= 7.0 ? 10752.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 5467.0 : 47780.0 ) ) ) : idx;\r
	idx = y == 4.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 5467.0 : 0.0 ) ) ) : idx;\r
	idx = y == 3.0 ? ( x <= 7.0 ? 10896.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 5467.0 : 64169.0 ) ) ) : idx;\r
	idx = y == 2.0 ? ( x <= 7.0 ? 10916.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 17755.0 : 44714.0 ) ) ) : idx;\r
	idx = y == 1.0 ? ( x <= 7.0 ? 15017.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 37211.0 : 43946.0 ) ) ) : idx;\r
	idx = y == 0.0 ? ( x <= 7.0 ? 15017.0 : ( x <= 15.0 ? 43689.0 : ( x <= 23.0 ? 37211.0 : 43946.0 ) ) ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;    \r
    \r
    color = idx == 0.0 && x >= 0.0 && x < 32.0 && y >= 0.0 && y < 42.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 4,   88,  180 ) : color;\r
    color = idx == 2.0 ? RGB( 192, 192, 192 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;    \r
}\r
\r
void SpriteBossTopPanel( inout vec3 color, float x, float y )\r
{\r
	float idx = 0.0;    \r
\r
	idx = y == 51.0 ? ( x <= 7.0 ? 16384.0 : 10922.0 ) : idx;\r
	idx = y == 50.0 ? ( x <= 7.0 ? 62464.0 : 9558.0 ) : idx;\r
	idx = y == 49.0 ? ( x <= 7.0 ? 61248.0 : 9558.0 ) : idx;\r
	idx = y == 48.0 ? ( x <= 7.0 ? 60148.0 : 9558.0 ) : idx;\r
	idx = y == 47.0 ? ( x <= 7.0 ? 60078.0 : 9558.0 ) : idx;\r
	idx = y == 46.0 ? ( x <= 7.0 ? 58793.0 : 9558.0 ) : idx;\r
	idx = y == 45.0 ? ( x <= 7.0 ? 57433.0 : 9558.0 ) : idx;\r
	idx = y == 44.0 ? ( x <= 7.0 ? 57353.0 : 9558.0 ) : idx;\r
	idx = y == 43.0 ? ( x <= 7.0 ? 61193.0 : 9558.0 ) : idx;\r
	idx = y == 42.0 ? ( x <= 7.0 ? 60153.0 : 9558.0 ) : idx;\r
	idx = y == 41.0 ? ( x <= 7.0 ? 58761.0 : 9558.0 ) : idx;\r
	idx = y == 40.0 ? ( x <= 7.0 ? 57609.0 : 9558.0 ) : idx;\r
	idx = y == 39.0 ? ( x <= 7.0 ? 61193.0 : 9558.0 ) : idx;\r
	idx = y == 38.0 ? ( x <= 7.0 ? 60153.0 : 9558.0 ) : idx;\r
	idx = y == 37.0 ? ( x <= 7.0 ? 58761.0 : 9558.0 ) : idx;\r
	idx = y == 36.0 ? ( x <= 7.0 ? 57609.0 : 9558.0 ) : idx;\r
	idx = y == 35.0 ? ( x <= 7.0 ? 61193.0 : 9558.0 ) : idx;\r
	idx = y == 34.0 ? ( x <= 7.0 ? 60153.0 : 9558.0 ) : idx;\r
	idx = y == 33.0 ? ( x <= 7.0 ? 58761.0 : 9558.0 ) : idx;\r
	idx = y == 32.0 ? ( x <= 7.0 ? 57609.0 : 9558.0 ) : idx;\r
	idx = y == 31.0 ? ( x <= 7.0 ? 61193.0 : 9558.0 ) : idx;\r
	idx = y == 30.0 ? ( x <= 7.0 ? 60153.0 : 9558.0 ) : idx;\r
	idx = y == 29.0 ? ( x <= 7.0 ? 58761.0 : 9558.0 ) : idx;\r
	idx = y == 28.0 ? ( x <= 7.0 ? 57609.0 : 9558.0 ) : idx;\r
	idx = y == 27.0 ? ( x <= 7.0 ? 61193.0 : 9558.0 ) : idx;\r
	idx = y == 26.0 ? ( x <= 7.0 ? 60153.0 : 9558.0 ) : idx;\r
	idx = y == 25.0 ? ( x <= 7.0 ? 58761.0 : 9558.0 ) : idx;\r
	idx = y == 24.0 ? ( x <= 7.0 ? 57609.0 : 9558.0 ) : idx;\r
	idx = y == 23.0 ? ( x <= 7.0 ? 61193.0 : 10582.0 ) : idx;\r
	idx = y == 22.0 ? ( x <= 7.0 ? 60153.0 : 11606.0 ) : idx;\r
	idx = y == 21.0 ? ( x <= 7.0 ? 58761.0 : 11606.0 ) : idx;\r
	idx = y == 20.0 ? ( x <= 7.0 ? 57609.0 : 11606.0 ) : idx;\r
	idx = y == 19.0 ? ( x <= 7.0 ? 61193.0 : 11606.0 ) : idx;\r
	idx = y == 18.0 ? ( x <= 7.0 ? 60153.0 : 11606.0 ) : idx;\r
	idx = y == 17.0 ? ( x <= 7.0 ? 58761.0 : 11606.0 ) : idx;\r
	idx = y == 16.0 ? ( x <= 7.0 ? 57609.0 : 11606.0 ) : idx;\r
	idx = y == 15.0 ? ( x <= 7.0 ? 61193.0 : 11606.0 ) : idx;\r
	idx = y == 14.0 ? ( x <= 7.0 ? 60153.0 : 11606.0 ) : idx;\r
	idx = y == 13.0 ? ( x <= 7.0 ? 58761.0 : 11606.0 ) : idx;\r
	idx = y == 12.0 ? ( x <= 7.0 ? 57609.0 : 11606.0 ) : idx;\r
	idx = y == 11.0 ? ( x <= 7.0 ? 59913.0 : 11606.0 ) : idx;\r
	idx = y == 10.0 ? ( x <= 7.0 ? 60073.0 : 11606.0 ) : idx;\r
	idx = y == 9.0 ? ( x <= 7.0 ? 65449.0 : 11611.0 ) : idx;\r
	idx = y == 8.0 ? ( x <= 7.0 ? 60158.0 : 6491.0 ) : idx;\r
	idx = y == 7.0 ? ( x <= 7.0 ? 43684.0 : 366.0 ) : idx;\r
	idx = y == 6.0 ? ( x <= 7.0 ? 43684.0 : 5486.0 ) : idx;\r
	idx = y == 5.0 ? ( x <= 7.0 ? 43664.0 : 5562.0 ) : idx;\r
	idx = y == 4.0 ? ( x <= 7.0 ? 43664.0 : 5866.0 ) : idx;\r
	idx = y == 3.0 ? ( x <= 7.0 ? 43584.0 : 5866.0 ) : idx;\r
	idx = y == 2.0 ? ( x <= 7.0 ? 43264.0 : 11178.0 ) : idx;\r
	idx = y == 1.0 ? ( x <= 7.0 ? 43264.0 : 5466.0 ) : idx;\r
	idx = y == 0.0 ? ( x <= 7.0 ? 21504.0 : 21.0 ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 15.0 ? idx : 0.0;    \r
    \r
    color = idx == 0.0 && x >= 0.0 && x < 15.0 && y >= 8.0 && y < 48.0 ? RGB( 0, 0, 0 ) : color;\r
    color = idx == 1.0 ? RGB( 4,   88,  180 ) : color;\r
    color = idx == 2.0 ? RGB( 192, 192, 192 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;        \r
}\r
\r
void SpriteBossCannon0( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
	idx = y == 5.0 ? ( x <= 7.0 ? 39340.0 : 1706.0 ) : idx;\r
	idx = y == 4.0 ? ( x <= 7.0 ? 30663.0 : 2044.0 ) : idx;\r
	idx = y == 3.0 ? ( x <= 7.0 ? 17415.0 : 1024.0 ) : idx;\r
	idx = y == 2.0 ? ( x <= 7.0 ? 30663.0 : 2044.0 ) : idx;\r
	idx = y == 1.0 ? ( x <= 7.0 ? 26615.0 : 2047.0 ) : idx;\r
	idx = y == 0.0 ? ( x <= 7.0 ? 39340.0 : 682.0 ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 14.0 ? idx : 0.0;\r
\r
    color = idx == 0.0 && x >= 1.0 && x < 11.0 && y >= 0.0 && y < 6.0 ? RGB( 255, 255, 255 ) : color;    \r
    color = idx == 1.0 ? RGB( 0,   0,   0 )   : color;\r
    color = idx == 2.0 ? RGB( 4,   88,  180 ) : color;\r
    color = idx == 3.0 ? RGB( 192, 192, 192 ) : color;\r
}\r
\r
void SpriteBossCannon1( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
	idx = y == 5.0 ? ( x <= 7.0 ? 39340.0 : 1706.0 ) : idx;\r
	idx = y == 4.0 ? ( x <= 7.0 ? 30663.0 : 2044.0 ) : idx;\r
	idx = y == 3.0 ? ( x <= 7.0 ? 17415.0 : 256.0 ) : idx;\r
	idx = y == 2.0 ? ( x <= 7.0 ? 30663.0 : 508.0 ) : idx;\r
	idx = y == 1.0 ? ( x <= 7.0 ? 26615.0 : 127.0 ) : idx;\r
	idx = y == 0.0 ? ( x <= 7.0 ? 39340.0 : 106.0 ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 14.0 ? idx : 0.0;\r
\r
    color = idx == 0.0 && x >= 1.0 && x < 12.0 && y >= 0.0 && y < 6.0 ? RGB( 255, 255, 255 ) : color;    \r
    color = idx == 1.0 ? RGB( 0,   0,   0 )   : color;\r
    color = idx == 2.0 ? RGB( 4,   88,  180 ) : color;\r
    color = idx == 3.0 ? RGB( 192, 192, 192 ) : color;\r
}\r
\r
void main()\r
{\r
    float resMultX      = floor( iResolution.x / NES_RES_X );\r
    float resMultY      = floor( iResolution.y / NES_RES_Y );\r
    float resRcp        = 1.0 / max( min( resMultX, resMultY ), 1.0 );\r
    float screenWidth   = floor( iResolution.x * resRcp );\r
    float screenHeight  = floor( iResolution.y * resRcp );\r
    float pixelX        = floor( gl_FragCoord.x * resRcp );\r
    float pixelY        = floor( gl_FragCoord.y * resRcp );\r
    \r
    vec4 camera         = LoadValue( txCamera );\r
    vec4 bridge         = LoadValue( txBridge );\r
    vec4 bossCore       = LoadValue( txBossCore );\r
    vec4 bossCannon0    = LoadValue( txBossCannon0 );\r
    vec4 bossCannon1    = LoadValue( txBossCannon1 );\r
    \r
    float worldX        = pixelX + camera.x;\r
    float worldY        = pixelY - 8.0;\r
    float tileX         = floor( worldX / 32.0 );\r
    float tile8X        = floor( worldX / 8.0 );\r
    float tile32Y       = floor( worldY / 32.0 );\r
    float tile16Y       = floor( worldY / 16.0 );\r
    float tile8Y        = floor( worldY / 8.0 );\r
    float worldXMod16   = mod( worldX, 16.0 );\r
    float worldYMod16   = mod( worldY, 16.0 );    \r
    float worldYMod8    = mod( worldY,  8.0 );\r
    float worldXMod32   = mod( worldX, 32.0 );\r
    float worldYMod32   = mod( worldY, 32.0 );\r
    \r
\r
    vec3 color = RGB( 0, 0, 0 );\r
    \r
    // stars\r
    float starRand = Rand( vec2( worldX * 0.01, worldY * 0.01 ) );\r
    if ( starRand > 0.998 && worldY > 160.0 )\r
    {\r
        color = fract( iTime + starRand * 113.17 + worldX * 3.14 ) < 0.5 ? RGB( 255, 255, 255 ) : RGB( 0, 112, 236 );\r
    }\r
    \r
    // background water\r
    if ( worldY < 80.0 && worldX < WATER_END )\r
    {\r
        color = RGB( 0, 112, 236 );\r
    }\r
   \r
    if ( worldX >= JUNGLE_START + 3.0 && worldX < JUNGLE_END )\r
    {\r
        SpriteTreeTrunk( color, mod( worldX - 3.0, 16.0 ), mod( worldY, 2.0 ) );    \r
        \r
    }\r
\r
    if ( worldX >= JUNGLE_START + 3.0 && worldX < JUNGLE_END && floor( ( worldY + 5.0 ) / 32.0 ) == 6.0 )\r
    {\r
        SpriteLeaves( color, mod( worldX - 3.0, 32.0 ), mod( worldY + 5.0, 32.0 ) );\r
    }\r
    \r
    bool grass0 = false;\r
    bool grass2 = false;\r
    bool grass3 = false;\r
    bool grass4 = false;\r
    bool grass6 = false;\r
    bool grass8 = false;\r
    \r
    if (        ( tileX >= 52.0 && tileX < 67.0 ) \r
            ||  ( tileX >= 72.0 && tileX < 77.0 )   \r
            ||  ( tileX >= 86.0 && tileX < 88.0 ) )\r
    {\r
        grass8 = true;\r
    }\r
    \r
    if (        ( tileX >= 3.0   && tileX < 30.0 ) \r
            ||  ( tileX >= 35.0  && tileX < 40.0 ) \r
            ||  ( tileX >= 45.0  && tileX < 53.0 ) \r
            ||  ( tileX >= 66.0  && tileX < 73.0 )\r
            ||  ( tileX >= 78.0  && tileX < 80.0 )\r
            ||  ( tileX >= 85.0  && tileX < 87.0 )\r
            ||  ( tileX >= 89.0  && tileX < 91.0 )\r
            ||  ( tileX >= 102.0 && tileX < 106.0 ) )\r
    {\r
        grass6 = true;\r
    }\r
    \r
    if (        ( tileX >= 10.0 && tileX < 13.0 )\r
            ||  ( tileX >= 18.0 && tileX < 20.0 )\r
            ||  ( tileX >= 58.0 && tileX < 65.0 )\r
            ||  ( tileX >= 76.0 && tileX < 79.0 )\r
            ||  ( tileX >= 81.0 && tileX < 83.0 )\r
            ||  ( tileX >= 90.0 && tileX < 95.0 )\r
            ||  ( tileX >= 100.0 && tileX < 102.0 )\r
            ||  ( tileX == 106.0 ) )\r
    {\r
        grass4 = true;\r
    }\r
    \r
    if (        ( tileX >= 26.0 && tileX < 29.0 )\r
            ||  ( tileX >= 55.0 && tileX < 57.0 )\r
            ||  ( tileX == 74.0 )\r
            ||  ( tileX == 87.0 )\r
            ||  ( tileX >= 103.0 && tileX < 106.0 ) )\r
    {\r
        grass3 = true;\r
    }\r
        \r
    if (        ( tileX == 13.0 || tileX == 16.0 )\r
            ||  ( tileX >= 68.0 && tileX < 70.0 )\r
            ||  ( tileX >= 71.0 && tileX < 73.0 )\r
            ||  ( tileX >= 82.0 && tileX < 85.0 )\r
            ||  ( tileX >= 97.0 && tileX < 99.0 )\r
            ||  ( tileX == 107.0 ) )\r
    {\r
        grass2 = true;\r
    }\r
        \r
    if (        ( tileX >= 14.0 && tileX < 16.0 ) \r
            ||  ( tileX >= 24.0 && tileX < 26.0 ) \r
            ||  ( tileX >= 52.0 && tileX < 55.0 ) \r
            ||  ( tileX >= 62.0 && tileX < 68.0 )\r
            ||  ( tileX == 81.0 )\r
            ||  ( tileX == 86.0 )\r
            ||  ( tileX >= 93.0 && tileX < 96.0 )\r
            ||  ( tileX >= 102.0 ) )      \r
    {\r
        grass0 = true;\r
    }\r
    \r
    float rockTile32Y = -1.0;\r
    if ( grass2 )\r
    {\r
        rockTile32Y = 1.0;\r
    }       \r
    if ( grass4 )\r
    {\r
        rockTile32Y = 2.0;\r
    }        \r
    if ( grass6 )\r
    {\r
        rockTile32Y = 3.0;\r
    }\r
    if ( grass8 )\r
    {\r
        rockTile32Y = 4.0;\r
    }    \r
    \r
    if ( tile32Y < rockTile32Y )\r
    {\r
        SpriteRock( color, worldXMod32, mod( worldY + 8.0, 32.0 ) );    \r
    }\r
    \r
    if (        ( tile8Y == -1.0 && grass0 ) \r
            ||  ( tile8Y == 3.0 && grass2 )\r
            ||  ( tile8Y == 5.0 && grass3 )\r
            ||  ( tile8Y == 7.0 && grass4 )\r
            ||  ( tile8Y == 11.0 && grass6 )\r
            ||  ( tile8Y == 15.0 && grass8 ) )\r
    {\r
        SpriteRockTop( color, worldXMod32, worldYMod8 );\r
    }    \r
    \r
    // foreground water\r
    if ( ( worldY < 16.0 && worldX < WATER_END ) \r
        || ( tile16Y < 2.0 && (\r
                    ( tileX < 10.0 ) \r
                ||  ( tileX == 17.0 )\r
                ||  ( tileX >= 20.0 && tileX < 23.0 )\r
                ||  ( tileX >= 33.0 && tileX < 47.0 )\r
                ||  ( tileX == 57.0 ) \r
           ) )\r
       )\r
    {\r
        color = RGB( 0, 112, 236 );\r
    }    \r
    \r
    if (    ( floor( ( worldY - 1.0 ) / 8.0 ) == 3.0 && ( ( tileX >= 3.0 && tileX < 10.0 ) || ( tileX == 17.0 ) || ( tileX >= 20.0 && tileX < 23.0 ) || ( tileX >= 35.0 && tileX < 40.0 ) || ( tileX >= 45.0 && tileX < 47.0 ) || ( tileX == 57.0 ) ) )\r
         || ( floor( ( worldY - 1.0 ) / 8.0 ) == 1.0 && ( ( tileX >= 10.0 && tileX < 17.0 ) || ( tileX >= 18.0 && tileX < 20.0 ) || ( tileX >= 23.0 && tileX < 30.0 ) || ( tileX >= 47.0 && tileX < 57.0 ) || ( tileX >= 58.0 && tileX < 63.0 ) ) )\r
         || ( floor( ( worldY - 1.0 ) / 8.0 ) == -1.0 && ( ( tileX >= 14.0 && tileX < 16.0 ) || ( tileX >= 24.0 && tileX < 26.0 ) || ( tileX >= 52.0 && tileX < 55.0 ) || ( tileX == 62.0 ) ) )\r
       )\r
    {\r
        SpriteShore( color, mod( worldX, 32.0 ), mod( worldY - 1.0, 8.0 ) );  \r
    }    \r
    \r
    if ( floor( ( worldY ) / 24.0 ) == 1.0 && ( tile8X == 11.0 || tile8X == 139.0 || tile8X == 160.0 || tile8X == 179.0 ) )\r
    {\r
        float shoreX = ( tile8X == 160.0 ) ? 7.0 - worldX : worldX;\r
        SpriteShoreSide( color, mod( shoreX, 8.0 ), mod( worldY, 24.0 ) );\r
    }        \r
    \r
	if ( floor( ( worldY + 14.0 ) / 24.0 ) == 1.0 && ( tile8X == 39.0 || tile8X == 68.0 || tile8X == 72.0 || tile8X == 80.0 || tile8X == 91.0 || tile8X == 120.0 || tile8X == 187.0 || tile8X == 228.0 || tile8X == 231.0 ) )\r
    {\r
        float shoreX = ( tile8X == 68.0 || tile8X == 80.0 || tile8X == 120.0 || tile8X == 228.0 ) ? 7.0 - worldX : worldX;\r
        SpriteShoreSide( color, mod( shoreX, 8.0 ), mod( worldY + 14.0, 24.0 ) );\r
    }    \r
    \r
    if ( floor( ( worldY + 6.0 ) / 24.0 ) == 0.0 && ( tile8X == 55.0 || tile8X == 64.0 || tile8X == 95.0 || tile8X == 104.0 || tile8X == 207.0 || tile8X == 220.0 || tile8X == 247.0 ) )\r
    {\r
        float shoreX = ( tile8X == 64.0 || tile8X == 104.0 || tile8X == 220.0 ) ? 7.0 - worldX : worldX;\r
    	SpriteShoreSide( color, mod( shoreX, 8.0 ), mod( worldY + 6.0, 24.0 ) );\r
    }\r
    \r
    if (        ( tile16Y == 0.0 && grass0 ) \r
            ||  ( tile16Y == 2.0 && grass2 )\r
            ||  ( tile16Y == 3.0 && grass3 )\r
            ||  ( tile16Y == 4.0 && grass4 )\r
            ||  ( tile16Y == 6.0 && grass6 )\r
            ||  ( tile16Y == 8.0 && grass8 ) )\r
    {\r
        SpriteGrass( color, worldXMod32, worldYMod16 );\r
    }\r
    \r
    if (        ( grass8 && tile16Y == 9.0 )\r
            ||  ( !grass8 && grass6 && tile16Y == 7.0 )\r
            ||  ( !grass8 && !grass6 && grass4 && tile16Y == 5.0 )\r
            ||  ( !grass8 && !grass6 && !grass4 && grass2 && tile16Y == 3.0 )\r
            ||  ( !grass8 && !grass6 && !grass4 && !grass2 && grass0 && tile16Y == 1.0 ) )\r
    {\r
        SpriteBush( color, worldXMod32, worldYMod16 );\r
    }\r
    \r
    if ( floor( ( worldY - 1.0 ) / 24.0 ) == 5.0 && ( \r
                ( tileX >= 3.0 && tileX < 30.0 ) \r
            ||  ( tileX >= 35.0 && tileX < 40.0 )\r
            ||  ( tileX >= 45.0 && tileX < 52.0 )) )\r
    {\r
		SpriteTreeMiddle( color, mod( worldX + 8.0, 16.0 ), mod( worldY - 1.0, 24.0 ) );\r
    }\r
    \r
    if ( floor( ( worldY - 1.0 ) / 24.0 ) == 5.0 && \r
        ( ( tile8X == 12.0 || tile8X == 34.0 || tile8X == 140.0 || tile8X == 180.0 )\r
        || ( mod( tile8X, 16.0 ) == 0.0 ) && tile8X < 119.0 ) )\r
    {\r
    	SpriteTreeStart( color, mod( worldX, 8.0 ), mod( worldY - 1.0, 24.0 ) );\r
    }\r
    \r
    if ( floor( ( worldY - 1.0 ) / 24.0 ) == 5.0 && \r
        ( ( tile8X == 119.0 || tile8X == 159.0 || tile8X == 207.0 )\r
        || ( mod( tile8X + 1.0, 16.0 ) == 0.0 ) && tile8X < 119.0 ) )\r
    {\r
    	SpriteTreeEnd( color, mod( worldX, 8.0 ), mod( worldY - 1.0, 24.0 ) );\r
    }    \r
    \r
    if ( floor( ( worldY + 12.0 ) / 32.0 ) == 3.0 && bridge.x < tileX && (\r
            ( tileX >= BRIDGE_0_START_TILE && tileX < BRIDGE_0_END_TILE )\r
        ||  ( tileX >= BRIDGE_1_START_TILE && tileX < BRIDGE_1_END_TILE )\r
       ) )\r
    {\r
        SpriteBridge( color, worldXMod32, mod( worldY + 12.0, 32.0 ) );\r
    }  \r
    \r
    // boss back\r
    if ( worldX > 3506.0 && worldY < 168.0 )\r
    {\r
        float idx = 2.0;\r
                \r
        // horizontal bars\r
        idx = mod( worldX, 16.0 ) == 0.0 && mod( worldY + 8.0, 88.0 ) < 76.0 ? 3.0 : idx;\r
        idx = mod( worldX + 8.0, 16.0 ) == 0.0 && mod( worldY + 8.0, 88.0 ) < 76.0 ? 1.0 : idx;\r
        idx = mod( worldX, 16.0 ) > 8.0 && mod( worldY + 8.0, 88.0 ) == 76.0 ? 1.0 : idx;\r
        \r
        // vertical bars\r
        idx = mod( worldY + 8.0, 88.0 ) == 0.0 ? 1.0 : idx;\r
        idx = mod( worldY + 9.0, 88.0 ) == 0.0 ? 3.0 : idx;\r
        idx = mod( worldY + 10.0, 88.0 ) == 0.0 ? 4.0 : idx;\r
        idx = mod( worldY + 11.0, 88.0 ) == 0.0 ? 3.0 : idx;\r
        idx = mod( worldY + 12.0, 88.0 ) == 0.0 ? 3.0 : idx;\r
        idx = mod( worldY + 13.0, 88.0 ) == 0.0 ? 1.0 : idx;\r
        idx = worldX == 3506.0 + 1.0 ? 3.0 : idx;\r
        idx = worldX == 3506.0 + 2.0 ? 4.0 : idx;\r
        \r
        color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
        color = idx == 2.0 ? RGB( 4,   88,  180 ) : color;\r
        color = idx == 3.0 ? RGB( 192, 192, 192 ) : color;\r
        color = idx == 4.0 ? RGB( 255, 255, 255 ) : color;\r
    }\r
    \r
    // boss front\r
    if ( worldX >= 3476.0 && worldX <= 3506.0 && worldY >= 16.0 && worldY <= 152.0 + floor( 0.5 * ( worldX - 3476.0 ) ) )\r
    {\r
        float idx = 3.0;\r
        \r
        // vertical bars\r
        idx = mod( worldX, 4.0 ) == 0.0       ? 1.0 : idx;\r
        idx = mod( worldX - 1.0, 8.0 ) == 0.0 ? 4.0 : idx;\r
        idx = mod( worldX - 3.0, 8.0 ) == 0.0 ? 2.0 : idx;\r
        \r
        // top\r
        idx = worldY == 152.0 + floor( 0.5 * ( worldX - 3476.0 ) ) ? 2.0 : idx;\r
        \r
        // middle\r
        idx = worldY == 83.0 && worldX < 3504.0 ? 1.0 : idx;\r
        idx = worldY == 82.0 && worldX >= 3477.0 && worldX < 3504.0 ? 3.0 : idx;\r
        idx = worldY == 81.0 && worldX >= 3477.0 && worldX < 3504.0 ? 3.0 : idx;\r
        idx = worldY == 81.0 && mod( worldX + 4.0, 8.0 ) > 4.0 && worldX < 3504.0 ? 1.0 : idx;\r
        \r
        // bottom\r
        idx = worldY < 20.0 - floor( 0.2 * ( worldX - 3476.0 ) ) ? 1.0 : idx;\r
        idx = worldY == 20.0 - floor( 0.2 * ( worldX - 3476.0 ) ) ? 2.0 : idx;\r
        \r
        \r
        color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
        color = idx == 2.0 ? RGB( 4,   88,  180 ) : color;\r
        color = idx == 3.0 ? RGB( 192, 192, 192 ) : color;\r
        color = idx == 4.0 ? RGB( 255, 255, 255 ) : color;        \r
    }\r
    \r
    SpriteBossCore( color, worldX - bossCore.x + BOSS_CORE_SIZE.x * 0.5, worldY - bossCore.y );\r
    SpriteBossCannonBase( color, worldX - 3477.0, worldY - 84.0 );\r
    SpriteBossTopPanel( color, worldX - 3469.0, worldY - 116.0 );\r
    SpriteBossTopPanel( color, worldX - 3493.0, worldY - 120.0 );\r
    SpriteBossCannon0( color, worldX - bossCannon0.x + BOSS_CANNON_SIZE.x * 0.5, worldY - bossCannon0.y );\r
    SpriteBossCannon1( color, worldX - bossCannon1.x + BOSS_CANNON_SIZE.x * 0.5, worldY - bossCannon1.y );\r
    \r
    gl_FragColor = vec4( color, 1.0 );\r
}`,M=`// Foreground\r
\r
\r
uniform vec3      iResolution;           // viewport resolution (in pixels)\r
uniform float     iTime;                 // shader playback time (in seconds)\r
uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube\r
uniform sampler2D iChannel1;          // input channel. XX = 2D/Cube\r
\r
#define SPRITE_DEC_2( x, i ) mod( floor( i / pow( 2.0, mod( x, 24.0 ) ) ), 2.0 )\r
#define SPRITE_DEC_3( x, i ) mod( floor( i / pow( 4.0, mod( x, 11.0 ) ) ), 4.0 )\r
#define SPRITE_DEC_4( x, i ) mod( floor( i / pow( 4.0, mod( x, 8.0 ) ) ), 4.0 )\r
#define RGB( r, g, b ) vec3( float( r ) / 255.0, float( g ) / 255.0, float( b ) / 255.0 )\r
\r
const float NES_RES_X           = 224.0;\r
const float NES_RES_Y           = 192.0;\r
const float STATE_RUN           = 0.0;\r
const float STATE_PRONE         = 1.0;\r
const float STATE_JUMP          = 2.0;\r
const float STATE_FALL          = 3.0;\r
const float STATE_WATER         = 4.0;\r
const float STATE_UNDER_WATER   = 5.0;\r
const vec2  BILL_PRONE_SIZE     = vec2( 32.0, 18.0 );\r
const vec2  BILL_RUN_SIZE       = vec2( 24.0, 34.0 );\r
const vec2  BILL_JUMP_SIZE      = vec2( 20.0, 20.0 );\r
const vec2  SOLDIER_SIZE        = vec2( 18.0, 32.0 );\r
const vec2  SNIPER_SIZE         = vec2( 24.0, 32.0 );\r
const vec2  TURRET_SIZE         = vec2( 32.0, 32.0 );\r
const vec2  BOSS_CORE_SIZE      = vec2( 24.0, 31.0 );\r
\r
// storage\r
const vec2 txPlayer 			= vec2( 0.0, 0.0 ); 	// xy - pos, z - jump start, w - jump dir\r
const vec2 txPlayerState		= vec2( 1.0, 0.0 ); 	// x - state, y - frame, z - jump tick, w - lifes\r
const vec2 txPlayerDir			= vec2( 2.0, 0.0 ); 	// xy - dir, z - flip, w - immortality\r
const vec2 txPlayerWeapon		= vec2( 3.0, 0.0 ); 	// x - weapon, y - weapon cooldown, z - weapon fire rate, w - weapon bullet num\r
const vec2 txCamera 			= vec2( 4.0, 0.0 ); 	// x - cam offset, y - spawn counter, z - soldier spawn counter\r
const vec2 txSoldier0 			= vec2( 5.0, 0.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier1 			= vec2( 5.0, 1.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier2 			= vec2( 5.0, 2.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier0State 		= vec2( 6.0, 0.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier1State 		= vec2( 6.0, 1.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier2State 		= vec2( 6.0, 2.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSniper	 			= vec2( 7.0, 0.0 ); 	// xy - pos, z - flip, w - weapon cooldown\r
const vec2 txPlayerBullet0 		= vec2( 8.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet1 		= vec2( 8.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet2 		= vec2( 8.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet3 		= vec2( 8.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet4 		= vec2( 8.0, 4.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet5 		= vec2( 8.0, 5.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet0 		= vec2( 9.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet1 		= vec2( 9.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet2 		= vec2( 9.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet3 		= vec2( 9.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txExplosion 			= vec2( 10.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txHit 				= vec2( 11.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txTurret0			= vec2( 12.0, 0.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret1			= vec2( 12.0, 1.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret0State		= vec2( 13.0, 0.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txTurret1State		= vec2( 13.0, 1.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txPowerUp			= vec2( 14.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txPowerUpState		= vec2( 15.0, 0.0 ); 	// x - state, y - initial height, z - jump tick\r
const vec2 txBossCore			= vec2( 16.0, 0.0 ); 	// xy - pos, z - HP\r
const vec2 txBossCannon0		= vec2( 17.0, 0.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossCannon1		= vec2( 17.0, 1.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossBullet0		= vec2( 18.0, 0.0 ); 	// xy - pos, zw - velocity\r
const vec2 txBossBullet1		= vec2( 18.0, 1.0 ); 	// xy - pos, zw - velocity\r
const vec2 txGameState			= vec2( 19.0, 0.0 ); 	// x - state, y - state tick\r
const vec2 txBridge				= vec2( 20.0, 0.0 ); 	// x - draw start, y - explode tick\r
\r
void Swap( inout float a, inout float b )\r
{\r
    float tmp = a;\r
    a = b;\r
    b = tmp;\r
}\r
\r
vec4 LoadValue( vec2 tx )\r
{\r
    return floor( texture( iChannel0, ( tx + 0.5 ) /  iResolution.xy) );\r
}\r
\r
void SpriteTurret( inout vec3 color, float x, float y, float frame )\r
{\r
    float idx = 0.0;    \r
    \r
    if ( frame == 0.0 )\r
    {\r
        // left\r
        idx = y == 13.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21844.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 65533.0 : 21.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 48927.0 : 127.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 44922.0 : 426.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 21780.0 : ( x <= 15.0 ? 27621.0 : 425.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 43625.0 : ( x <= 15.0 ? 11162.0 : 681.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 65469.0 : ( x <= 15.0 ? 11127.0 : 681.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 43625.0 : ( x <= 15.0 ? 11262.0 : 681.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 21845.0 : ( x <= 15.0 ? 27509.0 : 425.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 21844.0 : ( x <= 15.0 ? 44650.0 : 427.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 17680.0 : ( x <= 15.0 ? 47642.0 : 362.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 43689.0 : 341.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21845.0 : 85.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21844.0 : 5.0 ) ) : idx; \r
    }\r
    else if ( frame == 1.0 )\r
    {\r
        // up - left\r
        idx = y == 14.0 ? ( x <= 7.0 ? 276.0 : ( x <= 15.0 ? 64.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 361.0 : ( x <= 15.0 ? 1488.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 5753.0 : ( x <= 15.0 ? 24564.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 27541.0 : ( x <= 15.0 ? 48253.0 : 1.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 47701.0 : ( x <= 15.0 ? 65014.0 : 7.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 58708.0 : ( x <= 15.0 ? 45018.0 : 30.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 38208.0 : ( x <= 15.0 ? 43766.0 : 106.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 25856.0 : ( x <= 15.0 ? 27381.0 : 169.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 41984.0 : ( x <= 15.0 ? 10939.0 : 169.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 41984.0 : ( x <= 15.0 ? 19129.0 : 169.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 41984.0 : ( x <= 15.0 ? 19124.0 : 170.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 37888.0 : ( x <= 15.0 ? 38587.0 : 106.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 44713.0 : 106.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 43669.0 : 90.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21844.0 : 85.0 ) ) : idx;   \r
    }\r
    else\r
    {\r
        // down - left\r
        idx = y == 14.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21824.0 : 5.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 65428.0 : 27.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 45053.0 : 106.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 53248.0 : ( x <= 15.0 ? 38591.0 : 106.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 62464.0 : ( x <= 15.0 ? 19188.0 : 170.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 58368.0 : ( x <= 15.0 ? 19133.0 : 169.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 41984.0 : ( x <= 15.0 ? 10938.0 : 169.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 25600.0 : ( x <= 15.0 ? 27365.0 : 169.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 37888.0 : ( x <= 15.0 ? 43750.0 : 107.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 58624.0 : ( x <= 15.0 ? 44954.0 : 90.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 47680.0 : ( x <= 15.0 ? 47526.0 : 86.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 27540.0 : ( x <= 15.0 ? 43113.0 : 85.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 22137.0 : ( x <= 15.0 ? 23205.0 : 5.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 38249.0 : ( x <= 15.0 ? 21909.0 : 1.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 21844.0 : ( x <= 15.0 ? 21845.0 : 0.0 ) ) : idx;      \r
    }\r
\r
    idx = SPRITE_DEC_4( x, idx );    \r
    idx = x >= 0.0 && x < 21.0 ? idx : 0.0;\r
\r
    float blink = abs( sin( iTime * 3.0 ) ) + 0.5;\r
    \r
    color = idx == 0.0 && x >= 8.0 && x < 16.0 && y >= 3.0 && y < 12.0 ? blink * RGB( 228, 68, 52 ) : color;\r
    color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 192, 192, 192 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteTurretBase( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 31.0 ? ( x <= 10.0 ? 2796201.0 : ( x <= 21.0 ? 2796202.0 : 174762.0 ) ) : idx;\r
    idx = y == 30.0 ? ( x <= 10.0 ? 1398102.0 : ( x <= 21.0 ? 1398101.0 : 349525.0 ) ) : idx;\r
    idx = y == 29.0 ? ( x <= 10.0 ? 2796182.0 : ( x <= 21.0 ? 2796202.0 : 289450.0 ) ) : idx;\r
    idx = y == 28.0 ? ( x <= 10.0 ? 2796198.0 : ( x <= 21.0 ? 2796202.0 : 285354.0 ) ) : idx;\r
    idx = y == 27.0 ? ( x <= 10.0 ? 1398182.0 : ( x <= 21.0 ? 1398101.0 : 279893.0 ) ) : idx;\r
    idx = y == 26.0 ? ( x <= 10.0 ? 1397158.0 : ( x <= 21.0 ? 1398101.0 : 279637.0 ) ) : idx;\r
    idx = y == 25.0 ? ( x <= 10.0 ? 1399206.0 : ( x <= 21.0 ? 1398101.0 : 280149.0 ) ) : idx;\r
    idx = y == 24.0 ? ( x <= 10.0 ? 21926.0 : ( x <= 21.0 ? 0.0 : 279888.0 ) ) : idx;\r
    idx = y == 23.0 ? ( x <= 10.0 ? 2692518.0 : ( x <= 21.0 ? 2796202.0 : 279905.0 ) ) : idx;\r
    idx = y == 22.0 ? ( x <= 10.0 ? 1709478.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 21.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 10.0 ? 1447334.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 10.0 ? 1381798.0 : ( x <= 21.0 ? 1398101.0 : 279905.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 10.0 ? 5542.0 : ( x <= 21.0 ? 0.0 : 279904.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 10.0 ? 2774438.0 : ( x <= 21.0 ? 2796202.0 : 279898.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 10.0 ? 1398182.0 : ( x <= 21.0 ? 1398101.0 : 279893.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 10.0 ? 1397158.0 : ( x <= 21.0 ? 1398101.0 : 279637.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 10.0 ? 1399206.0 : ( x <= 21.0 ? 1398101.0 : 280149.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 10.0 ? 102.0 : ( x <= 21.0 ? 0.0 : 278528.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 10.0 ? 1398102.0 : ( x <= 21.0 ? 1398101.0 : 283989.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 10.0 ? 6.0 : ( x <= 21.0 ? 0.0 : 262144.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 10.0 ? 1398100.0 : ( x <= 21.0 ? 1398101.0 : 87381.0 ) ) : idx;\r
\r
    idx = SPRITE_DEC_3( x, idx );    \r
    if ( x >= 0.0 && x < 32.0 && y >= 0.0 && y < 32.0 )\r
    {\r
        color = RGB( 0, 0, 0 );\r
        color = idx == 1.0 ? RGB( 192, 192, 192 ) : color;\r
        color = idx == 2.0 ? RGB( 255, 255, 255 ) : color;  \r
    }\r
}\r
\r
void SpriteSniper( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0; \r
    \r
    idx = y == 30.0 ? ( x <= 7.0 ? 21504.0 : 0.0 ) : idx;\r
    idx = y == 29.0 ? ( x <= 7.0 ? 43264.0 : ( x <= 15.0 ? 1.0 : 0.0 ) ) : idx;\r
    idx = y == 28.0 ? ( x <= 7.0 ? 48704.0 : ( x <= 15.0 ? 6.0 : 0.0 ) ) : idx;\r
    idx = y == 27.0 ? ( x <= 7.0 ? 23104.0 : ( x <= 15.0 ? 5125.0 : ( x <= 23.0 ? 20821.0 : 0.0 ) ) ) : idx;\r
    idx = y == 26.0 ? ( x <= 7.0 ? 62720.0 : ( x <= 15.0 ? 32085.0 : ( x <= 23.0 ? 30711.0 : 0.0 ) ) ) : idx;\r
    idx = y == 25.0 ? ( x <= 7.0 ? 30032.0 : ( x <= 15.0 ? 65021.0 : ( x <= 23.0 ? 20863.0 : 0.0 ) ) ) : idx;\r
    idx = y == 24.0 ? ( x <= 7.0 ? 21924.0 : ( x <= 15.0 ? 21855.0 : ( x <= 23.0 ? 117.0 : 0.0 ) ) ) : idx;\r
    idx = y == 23.0 ? ( x <= 7.0 ? 55993.0 : ( x <= 15.0 ? 58869.0 : ( x <= 23.0 ? 21.0 : 0.0 ) ) ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 22185.0 : ( x <= 15.0 ? 63997.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 64917.0 : ( x <= 15.0 ? 23903.0 : 0.0 ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 64852.0 : ( x <= 15.0 ? 1893.0 : 0.0 ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 21860.0 : ( x <= 15.0 ? 342.0 : 0.0 ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 27280.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 54608.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 21824.0 : ( x <= 15.0 ? 26.0 : 0.0 ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 43664.0 : ( x <= 15.0 ? 90.0 : 0.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 43664.0 : ( x <= 15.0 ? 105.0 : 0.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 27200.0 : ( x <= 15.0 ? 426.0 : 0.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 28304.0 : ( x <= 15.0 ? 490.0 : 0.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 7824.0 : ( x <= 15.0 ? 489.0 : 0.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 7824.0 : ( x <= 15.0 ? 421.0 : 0.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 1956.0 : ( x <= 15.0 ? 1700.0 : 0.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 420.0 : ( x <= 15.0 ? 1700.0 : 0.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 420.0 : ( x <= 15.0 ? 1680.0 : 0.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 404.0 : ( x <= 15.0 ? 1680.0 : 0.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 84.0 : ( x <= 15.0 ? 1360.0 : 0.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 84.0 : ( x <= 15.0 ? 1344.0 : 0.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 21.0 : ( x <= 15.0 ? 1344.0 : 0.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 53.0 : ( x <= 15.0 ? 7488.0 : 0.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 213.0 : ( x <= 15.0 ? 30016.0 : 0.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 340.0 : ( x <= 15.0 ? 21824.0 : 0.0 ) ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 24.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 0,   0,  0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56, 0 ) : color;\r
    color = idx == 3.0 ? y > 16.0 ? RGB( 240, 208, 176 ) : RGB( 255, 255, 255 ) : color;      \r
}\r
\r
void SpriteSoldier( inout vec3 color, float x, float y, float frame )\r
{\r
    float idx = 0.0;    \r
    \r
    if ( frame == 0.0 )\r
    {\r
        idx = y == 31.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 1344.0 : 0.0 ) ) : idx;\r
        idx = y == 30.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 6804.0 : 0.0 ) ) : idx;\r
        idx = y == 29.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 27621.0 : 0.0 ) ) : idx;\r
        idx = y == 28.0 ? ( x <= 7.0 ? 64768.0 : ( x <= 15.0 ? 5781.0 : 0.0 ) ) : idx;\r
        idx = y == 27.0 ? ( x <= 7.0 ? 65344.0 : ( x <= 15.0 ? 7510.0 : 0.0 ) ) : idx;\r
        idx = y == 26.0 ? ( x <= 7.0 ? 65492.0 : ( x <= 15.0 ? 7514.0 : 0.0 ) ) : idx;\r
        idx = y == 25.0 ? ( x <= 7.0 ? 65497.0 : ( x <= 15.0 ? 5542.0 : 0.0 ) ) : idx;\r
        idx = y == 24.0 ? ( x <= 7.0 ? 49113.0 : ( x <= 15.0 ? 5561.0 : 0.0 ) ) : idx;\r
        idx = y == 23.0 ? ( x <= 7.0 ? 28629.0 : ( x <= 15.0 ? 30125.0 : 0.0 ) ) : idx;\r
        idx = y == 22.0 ? ( x <= 7.0 ? 27229.0 : ( x <= 15.0 ? 29802.0 : 0.0 ) ) : idx;\r
        idx = y == 21.0 ? ( x <= 7.0 ? 38260.0 : ( x <= 15.0 ? 21845.0 : 0.0 ) ) : idx;\r
        idx = y == 20.0 ? ( x <= 7.0 ? 38388.0 : ( x <= 15.0 ? 62973.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 19.0 ? ( x <= 7.0 ? 27088.0 : ( x <= 15.0 ? 65525.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 18.0 ? ( x <= 7.0 ? 43328.0 : ( x <= 15.0 ? 21845.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 21760.0 : ( x <= 15.0 ? 29701.0 : 0.0 ) ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 21760.0 : ( x <= 15.0 ? 21509.0 : 0.0 ) ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 87.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 93.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 93.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 93.0 : 0.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 93.0 : 0.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 87.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 23808.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 23808.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 55104.0 : ( x <= 15.0 ? 7.0 : 0.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 57296.0 : ( x <= 15.0 ? 7.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 55104.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 62720.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 62464.0 : ( x <= 15.0 ? 127.0 : 0.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 85.0 : 0.0 ) ) : idx;\r
    }\r
    else\r
    {\r
        idx = y == 30.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5376.0 : 0.0 ) ) : idx;\r
        idx = y == 29.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 27200.0 : 0.0 ) ) : idx;\r
        idx = y == 28.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 44949.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 27.0 ? ( x <= 7.0 ? 62464.0 : ( x <= 15.0 ? 23127.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 26.0 ? ( x <= 7.0 ? 64768.0 : ( x <= 15.0 ? 30107.0 : 0.0 ) ) : idx;\r
        idx = y == 25.0 ? ( x <= 7.0 ? 65344.0 : ( x <= 15.0 ? 30038.0 : 0.0 ) ) : idx;\r
        idx = y == 24.0 ? ( x <= 7.0 ? 65344.0 : ( x <= 15.0 ? 21925.0 : 0.0 ) ) : idx;\r
        idx = y == 23.0 ? ( x <= 7.0 ? 48960.0 : ( x <= 15.0 ? 5561.0 : 0.0 ) ) : idx;\r
        idx = y == 22.0 ? ( x <= 7.0 ? 28224.0 : ( x <= 15.0 ? 7597.0 : 0.0 ) ) : idx;\r
        idx = y == 21.0 ? ( x <= 7.0 ? 26880.0 : ( x <= 15.0 ? 7530.0 : 0.0 ) ) : idx;\r
        idx = y == 20.0 ? ( x <= 7.0 ? 21760.0 : ( x <= 15.0 ? 21845.0 : 0.0 ) ) : idx;\r
        idx = y == 19.0 ? ( x <= 7.0 ? 54272.0 : ( x <= 15.0 ? 32095.0 : 0.0 ) ) : idx;\r
        idx = y == 18.0 ? ( x <= 7.0 ? 25600.0 : ( x <= 15.0 ? 32767.0 : 0.0 ) ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 21845.0 : 0.0 ) ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 7509.0 : 0.0 ) ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 1397.0 : 0.0 ) ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 1525.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 16469.0 : ( x <= 15.0 ? 6101.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 22013.0 : ( x <= 15.0 ? 23893.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 63485.0 : ( x <= 15.0 ? 30039.0 : 0.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 21885.0 : ( x <= 15.0 ? 30021.0 : 0.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 93.0 : ( x <= 15.0 ? 29952.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 93.0 : ( x <= 15.0 ? 23808.0 : 0.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 21.0 : ( x <= 15.0 ? 5440.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5440.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5952.0 : 0.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 8144.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 2000.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 24564.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 65360.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21760.0 : ( x <= 23.0 ? 1.0 : 0.0 ) ) ) : idx;\r
    }\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 18.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 0,   0,     0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56,    0 ) : color;\r
    color = idx == 3.0 ? y > 16.0 ? RGB( 240, 208, 176 ) : RGB( 255, 255, 255 ) : color;  \r
}\r
\r
void SpriteBillTorsoR( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 13.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 42240.0 : ( x <= 15.0 ? 6.0 : 0.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 21824.0 : ( x <= 15.0 ? 21.0 : 0.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 58688.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 58624.0 : ( x <= 15.0 ? 7.0 : 0.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 28240.0 : ( x <= 15.0 ? 87.0 : 0.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 44004.0 : ( x <= 15.0 ? 117.0 : 0.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 61433.0 : ( x <= 15.0 ? 494.0 : 0.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 61433.0 : ( x <= 15.0 ? 491.0 : 0.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 56313.0 : ( x <= 15.0 ? 1947.0 : 1024.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 63165.0 : ( x <= 15.0 ? 21867.0 : 6485.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 23540.0 : ( x <= 15.0 ? 57301.0 : 31671.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 65488.0 : ( x <= 15.0 ? 21851.0 : 5461.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 64848.0 : ( x <= 15.0 ? 39515.0 : 425.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 24.0 ? idx : 0.0;    \r
    color = idx == 1.0 ? RGB( 0,   0,     0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56,    0 ) : color;\r
    color = idx == 3.0 ? RGB( 240, 208, 176 ) : color;\r
}\r
\r
void SpriteBillTorsoT( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 25.0 ? ( x <= 7.0 ? 0.0 : 16.0 ) : idx;\r
    idx = y == 24.0 ? ( x <= 7.0 ? 0.0 : 116.0 ) : idx;\r
    idx = y == 23.0 ? ( x <= 7.0 ? 0.0 : 105.0 ) : idx;\r
    idx = y == 22.0 ? ( x <= 7.0 ? 0.0 : 116.0 ) : idx;\r
    idx = y == 21.0 ? ( x <= 7.0 ? 0.0 : 356.0 ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 0.0 : 1652.0 ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 0.0 : 1652.0 ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 0.0 : 1636.0 ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 0.0 : 1397.0 ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 16384.0 : 1654.0 ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 16384.0 : 1382.0 ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 16384.0 : 1655.0 ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 16384.0 : 1399.0 ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 36928.0 : 1654.0 ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 57744.0 : 1639.0 ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 55140.0 : 1398.0 ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 40921.0 : 2038.0 ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 40868.0 : 2038.0 ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 26256.0 : 1957.0 ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 39908.0 : 505.0 ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 31737.0 : 510.0 ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 65529.0 : 123.0 ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 64116.0 : 127.0 ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 21968.0 : 21.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 27600.0 : 0.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 44880.0 : 1.0 ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 14.0 ? idx : 0.0;    \r
    color = idx == 1.0 ? RGB( 0,   0,     0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56,    0 ) : color;\r
    color = idx == 3.0 ? RGB( 240, 208, 176 ) : color;\r
}\r
\r
void SpriteBillTorsoTR( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 15.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16384.0 : 0.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 54272.0 : 1.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 1280.0 : ( x <= 15.0 ? 47360.0 : 1.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 6736.0 : ( x <= 15.0 ? 26964.0 : 0.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 1445.0 : ( x <= 15.0 ? 7037.0 : 0.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 24405.0 : ( x <= 15.0 ? 1757.0 : 0.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 24485.0 : ( x <= 15.0 ? 6583.0 : 0.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 43348.0 : ( x <= 15.0 ? 6765.0 : 0.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 26356.0 : ( x <= 15.0 ? 6747.0 : 0.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 56317.0 : ( x <= 15.0 ? 1654.0 : 0.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 23549.0 : ( x <= 15.0 ? 1657.0 : 0.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 32509.0 : ( x <= 15.0 ? 509.0 : 0.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 49005.0 : ( x <= 15.0 ? 507.0 : 0.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 64953.0 : ( x <= 15.0 ? 95.0 : 0.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 63161.0 : ( x <= 15.0 ? 7.0 : 0.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 42724.0 : ( x <= 15.0 ? 1.0 : 0.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 18.0 ? idx : 0.0;    \r
    color = idx == 1.0 ? RGB( 0,   0,     0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56,    0 ) : color;\r
    color = idx == 3.0 ? RGB( 240, 208, 176 ) : color;\r
}\r
\r
void SpriteBillTorsoBR( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 21.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 1.0 : 0.0 ) ) : idx;\r
    idx = y == 20.0 ? ( x <= 7.0 ? 38208.0 : ( x <= 15.0 ? 6.0 : 0.0 ) ) : idx;\r
    idx = y == 19.0 ? ( x <= 7.0 ? 25680.0 : ( x <= 15.0 ? 26.0 : 0.0 ) ) : idx;\r
    idx = y == 18.0 ? ( x <= 7.0 ? 59648.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
    idx = y == 17.0 ? ( x <= 7.0 ? 59984.0 : ( x <= 15.0 ? 7.0 : 0.0 ) ) : idx;\r
    idx = y == 16.0 ? ( x <= 7.0 ? 63460.0 : ( x <= 15.0 ? 1.0 : 0.0 ) ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 22521.0 : ( x <= 15.0 ? 21.0 : 0.0 ) ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 49145.0 : ( x <= 15.0 ? 118.0 : 0.0 ) ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 64505.0 : ( x <= 15.0 ? 474.0 : 0.0 ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 64505.0 : ( x <= 15.0 ? 1946.0 : 0.0 ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 63396.0 : ( x <= 15.0 ? 1894.0 : 0.0 ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 39908.0 : ( x <= 15.0 ? 7653.0 : 0.0 ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 32720.0 : ( x <= 15.0 ? 1951.0 : 0.0 ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 49104.0 : ( x <= 15.0 ? 6783.0 : 0.0 ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 60736.0 : ( x <= 15.0 ? 30063.0 : 0.0 ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 37888.0 : ( x <= 15.0 ? 58970.0 : 1.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 39504.0 : 22.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 26896.0 : 109.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 41984.0 : 105.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 36864.0 : 485.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16384.0 : 400.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 0.0 : 64.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 21.0 ? idx : 0.0;    \r
    color = idx == 1.0 ? RGB( 0,   0,     0 ) : color;\r
    color = idx == 2.0 ? RGB( 248, 56,    0 ) : color;\r
    color = idx == 3.0 ? RGB( 240, 208, 176 ) : color;\r
}\r
\r
void SpriteBillLegs( inout vec3 color, float x, float y, float frame )\r
{\r
    // lower body\r
    float idx = 0.0;\r
    \r
    if ( frame == 0.0 )\r
    {\r
        x -= 2.0;\r
        idx = y == 19.0 ? ( x <= 7.0 ? 62800.0 : 1.0 ) : idx;\r
        idx = y == 18.0 ? ( x <= 7.0 ? 43664.0 : 1.0 ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 43664.0 : 1.0 ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 64080.0 : 1.0 ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 42320.0 : 6.0 ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 43328.0 : 27.0 ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 42560.0 : 26.0 ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 22848.0 : 110.0 ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 38144.0 : 26.0 ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 39168.0 : 26.0 ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 42560.0 : 7.0 ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 43344.0 : 6.0 ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 63892.0 : 1.0 ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 27241.0 : 0.0 ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 32357.0 : 0.0 ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 6756.0 : 0.0 ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 27216.0 : 0.0 ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 43584.0 : 5.0 ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 43584.0 : 26.0 ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 21824.0 : 21.0 ) : idx;\r
        idx = x >= 0.0 && x < 12.0 ? idx : 0.0;\r
    }\r
    else if ( frame == 1.0 )\r
    {\r
        idx = y == 19.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 341.0 : 0.0 ) ) : idx;\r
        idx = y == 18.0 ? ( x <= 7.0 ? 36864.0 : ( x <= 15.0 ? 1466.0 : 0.0 ) ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 36864.0 : ( x <= 15.0 ? 6570.0 : 0.0 ) ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 27246.0 : 0.0 ) ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 43626.0 : 1.0 ) ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 36864.0 : ( x <= 15.0 ? 43374.0 : 6.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 36864.0 : ( x <= 15.0 ? 42090.0 : 6.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 20480.0 : ( x <= 15.0 ? 42267.0 : 1.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 41984.0 : ( x <= 15.0 ? 43610.0 : 1.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 59648.0 : ( x <= 15.0 ? 27206.0 : 0.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 43264.0 : ( x <= 15.0 ? 6721.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 28224.0 : ( x <= 15.0 ? 1616.0 : 0.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 6800.0 : ( x <= 15.0 ? 1700.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 2000.0 : ( x <= 15.0 ? 425.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 420.0 : ( x <= 15.0 ? 420.0 : 0.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 425.0 : ( x <= 15.0 ? 1680.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 1961.0 : ( x <= 15.0 ? 6720.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 5796.0 : ( x <= 15.0 ? 1280.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 31376.0 : 0.0 ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 21824.0 : 0.0 ) : idx;\r
        idx = x >= 0.0 && x < 18.0 ? idx : 0.0;\r
    }\r
    else\r
    {   \r
        idx = y == 18.0 ? ( x <= 7.0 ? 37888.0 : ( x <= 15.0 ? 422.0 : 0.0 ) ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 36864.0 : ( x <= 15.0 ? 342.0 : 0.0 ) ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 36880.0 : ( x <= 15.0 ? 362.0 : 0.0 ) ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 21860.0 : ( x <= 15.0 ? 489.0 : 0.0 ) ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 43428.0 : ( x <= 15.0 ? 421.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 44457.0 : ( x <= 15.0 ? 1962.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 54377.0 : ( x <= 15.0 ? 1710.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 16489.0 : ( x <= 15.0 ? 1765.0 : 0.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 25.0 : ( x <= 15.0 ? 6480.0 : 0.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 25.0 : ( x <= 15.0 ? 27200.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 25.0 : ( x <= 15.0 ? 26880.0 : 0.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 4.0 : ( x <= 15.0 ? 30976.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 43264.0 : 1.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 41984.0 : 1.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21504.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 41984.0 : 5.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 41984.0 : 90.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 41984.0 : 426.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 20480.0 : 85.0 ) ) : idx;\r
        idx = x >= 0.0 && x < 22.0 ? idx : 0.0;\r
    }\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
\r
    color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 0,   88,  248 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 224, 168 ) : color;   \r
}\r
\r
void SpriteBillProne( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 16.0 ? ( x <= 7.0 ? 64.0 : 0.0 ) : idx;\r
    idx = y == 15.0 ? ( x <= 7.0 ? 400.0 : 0.0 ) : idx;\r
    idx = y == 14.0 ? ( x <= 7.0 ? 1940.0 : 0.0 ) : idx;\r
    idx = y == 13.0 ? ( x <= 7.0 ? 6745.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 84.0 : 0.0 ) ) ) : idx;\r
    idx = y == 12.0 ? ( x <= 7.0 ? 27044.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 425.0 : 0.0 ) ) ) : idx;\r
    idx = y == 11.0 ? ( x <= 7.0 ? 27024.0 : ( x <= 15.0 ? 0.0 : ( x <= 23.0 ? 341.0 : 1280.0 ) ) ) : idx;\r
    idx = y == 10.0 ? ( x <= 7.0 ? 7744.0 : ( x <= 15.0 ? 20480.0 : ( x <= 23.0 ? 22005.0 : 6485.0 ) ) ) : idx;\r
    idx = y == 9.0 ? ( x <= 7.0 ? 6800.0 : ( x <= 15.0 ? 41984.0 : ( x <= 23.0 ? 62966.0 : 31710.0 ) ) ) : idx;\r
    idx = y == 8.0 ? ( x <= 7.0 ? 18128.0 : ( x <= 15.0 ? 64773.0 : ( x <= 23.0 ? 38747.0 : 27306.0 ) ) ) : idx;\r
    idx = y == 7.0 ? ( x <= 7.0 ? 38564.0 : ( x <= 15.0 ? 65370.0 : ( x <= 23.0 ? 65435.0 : 5461.0 ) ) ) : idx;\r
    idx = y == 6.0 ? ( x <= 7.0 ? 59833.0 : ( x <= 15.0 ? 65390.0 : ( x <= 23.0 ? 49051.0 : 501.0 ) ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 60009.0 : ( x <= 15.0 ? 48602.0 : ( x <= 23.0 ? 44774.0 : 101.0 ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 44718.0 : ( x <= 15.0 ? 64986.0 : ( x <= 23.0 ? 22267.0 : 126.0 ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 43753.0 : ( x <= 15.0 ? 63125.0 : ( x <= 23.0 ? 43454.0 : 31.0 ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 22185.0 : ( x <= 15.0 ? 62784.0 : ( x <= 23.0 ? 58495.0 : 5.0 ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 340.0 : ( x <= 15.0 ? 54272.0 : ( x <= 23.0 ? 20511.0 : 0.0 ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16384.0 : ( x <= 23.0 ? 5.0 : 0.0 ) ) ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
    idx = x >= 0.0 && x < 32.0 ? idx : 0.0;\r
    color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
    color = idx == 2.0 ? x < 15.0 ? RGB( 0,   88,  248 ) : RGB( 248, 56,  0   ) : color;\r
    color = idx == 3.0 ? x < 15.0 ? RGB( 255, 224, 168 ) : RGB( 240, 208, 176 ) : color;   \r
}\r
\r
void SpriteBillJump( inout vec3 color, float x, float y, float frame )\r
{\r
    float idx = 0.0;\r
    bool colorA;\r
    \r
    if ( frame == 0.0 )\r
    {   \r
        colorA = x > 10.0;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 53312.0 : ( x <= 15.0 ? 95.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 53648.0 : ( x <= 15.0 ? 415.0 : 16.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 25956.0 : ( x <= 15.0 ? 1947.0 : 100.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 38745.0 : ( x <= 15.0 ? 7787.0 : 109.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 24549.0 : ( x <= 15.0 ? 27247.0 : 107.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 38825.0 : ( x <= 15.0 ? 43375.0 : 26.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 59748.0 : ( x <= 15.0 ? 38527.0 : 26.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 65428.0 : ( x <= 15.0 ? 27295.0 : 5.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 49124.0 : ( x <= 15.0 ? 27287.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 49120.0 : ( x <= 15.0 ? 43737.0 : 1.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 27600.0 : ( x <= 15.0 ? 43882.0 : 1.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 48960.0 : ( x <= 15.0 ? 27247.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 64768.0 : ( x <= 15.0 ? 27263.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 54272.0 : ( x <= 15.0 ? 5759.0 : 0.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 341.0 : 0.0 ) ) : idx;\r
        idx = x >= 0.0 && x < 20.0 ? idx : 0.0;\r
    }\r
    else\r
    {\r
        colorA = y < 9.0;\r
        idx = y == 19.0 ? ( x <= 7.0 ? 0.0 : 84.0 ) : idx;\r
        idx = y == 18.0 ? ( x <= 7.0 ? 20480.0 : 409.0 ) : idx;\r
        idx = y == 17.0 ? ( x <= 7.0 ? 26880.0 : 1642.0 ) : idx;\r
        idx = y == 16.0 ? ( x <= 7.0 ? 48960.0 : 6521.0 ) : idx;\r
        idx = y == 15.0 ? ( x <= 7.0 ? 65488.0 : 1533.0 ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 65268.0 : 374.0 ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 65268.0 : 5718.0 ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 59837.0 : 32155.0 ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 63229.0 : 32767.0 ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 56061.0 : 32447.0 ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 22205.0 : 5547.0 ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 44373.0 : 6741.0 ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 43945.0 : 1958.0 ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 43684.0 : 489.0 ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 43684.0 : 105.0 ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 23120.0 : 26.0 ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 17664.0 : 122.0 ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 16384.0 : 490.0 ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : 1701.0 ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : 336.0 ) : idx;\r
        idx = x >= 0.0 && x < 16.0 ? idx : 0.0;\r
    }\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
    color = idx == 1.0 ? RGB( 0,   0,   0   ) : color;\r
    color = idx == 2.0 ? colorA ? RGB( 0,   88,  248 ) : RGB( 248, 56,  0   ) : color;\r
    color = idx == 3.0 ? colorA ? RGB( 255, 224, 168 ) : RGB( 240, 208, 176 ) : color;   \r
}\r
\r
void SpriteWaterCircle( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 6.0 ? ( x <= 7.0 ? 14336.0 : 44.0 ) : idx;\r
    idx = y == 5.0 ? ( x <= 7.0 ? 49360.0 : 1795.0 ) : idx;\r
    idx = y == 4.0 ? ( x <= 7.0 ? 31874.0 : 33341.0 ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 819.0 : 52416.0 ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 47112.0 : 8238.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 4144.0 : 3076.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 36352.0 : 178.0 ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 16.0 ? idx : 0.0;\r
    \r
    color = idx == 1.0 ? RGB( 0,    0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 248,  56,  0   ) : color;\r
    color = idx == 3.0 ? RGB( 240,  208, 176 ) : color;\r
}\r
\r
void DrawTurret( inout vec3 color, vec4 turret, float worldX, float worldY )\r
{\r
    SpriteTurretBase( color, worldX - turret.x + TURRET_SIZE.x * 0.5, worldY - turret.y + TURRET_SIZE.y * 0.5 );\r
    \r
    // left \r
    float frame     = 0.0;\r
    float turretX   = worldX - turret.x;\r
    float turretY   = worldY - turret.y;\r
\r
    if ( turret.z == 0.0 )\r
    {\r
        frame = 0.0;\r
        turretX += 14.0;\r
        turretY += 7.0;\r
    }\r
    else if ( turret.z == 1.0 )\r
    {\r
        frame = 1.0;\r
        turretX += 13.0;\r
        turretY += 7.0;\r
    }\r
    else if ( turret.z == 2.0 )\r
    {\r
        frame = 2.0;\r
        turretX += 8.0;\r
        turretY += 3.0;\r
        Swap( turretX, turretY );\r
        turretX = 15.0 - turretX;\r
    }     \r
    else if ( turret.z == 3.0 )\r
    {\r
        frame = 0.0;\r
        turretX += 15.0;\r
        turretY += 2.0;\r
        Swap( turretX, turretY );\r
        turretX = 15.0 - turretX;\r
        turretY = 21.0 - turretY;\r
    }\r
    else if ( turret.z == 4.0 )\r
    {\r
        frame = 2.0;\r
        turretX += 14.0;\r
        turretY += 3.0;\r
        Swap( turretX, turretY );\r
        turretX = 15.0 - turretX;\r
        turretY = 21.0 - turretY;\r
    }\r
    else if ( turret.z == 5.0 )\r
    {\r
        frame = 1.0;\r
        turretX += 4.0;\r
        turretY += 7.0;\r
        turretX = 15.0 - turretX;        \r
    }    \r
    else if ( turret.z == 6.0 )\r
    {\r
        frame = 0.0;\r
        turretX += 9.0;\r
        turretY += 7.0;\r
        turretX = 21.0 - turretX;       \r
    }     \r
    else if ( turret.z == 7.0 )\r
    {\r
        frame = 2.0;\r
        turretX += 10.0;\r
        turretY += 7.0;\r
        turretX = 21.0 - turretX;       \r
    }    \r
    else if ( turret.z == 8.0 )\r
    {\r
        frame = 1.0;\r
        turretX += 8.0;\r
        turretY += 12.0;\r
        Swap( turretX, turretY );       \r
    }  \r
    else if ( turret.z == 9.0 )\r
    {\r
        frame = 0.0;\r
        turretX += 15.0;\r
        turretY += 13.0;\r
        Swap( turretX, turretY );\r
        turretY = 21.0 - turretY;        \r
    }          \r
    else if ( turret.z == 10.0 )\r
    {\r
        frame = 1.0;\r
        turretX += 15.0;\r
        turretY += 12.0;\r
        Swap( turretX, turretY );\r
        turretY = 21.0 - turretY;        \r
    }\r
    else\r
    {\r
        frame = 2.0;\r
        turretX += 13.0;\r
        turretY += 8.0;        \r
    }      \r
\r
    SpriteTurret( color, turretX, turretY, frame );\r
}\r
\r
void DrawSoldier( inout vec3 color, vec4 soldier, vec4 soldierState, float worldX, float worldY )\r
{\r
    float soldierX = worldX - soldier.x + SOLDIER_SIZE.x * 0.5;\r
    float soldierY = worldY - soldier.y;\r
    soldierX = soldier.z < 0.0 ? SOLDIER_SIZE.x - soldierX : soldierX;\r
    SpriteSoldier( color, soldierX, soldierY, soldierState.y );        \r
}\r
\r
void main()\r
{\r
    // we want 224x192 (overscan) and we want multiples of pixel size\r
    float resMultX      = floor( iResolution.x / NES_RES_X );\r
    float resMultY      = floor( iResolution.y / NES_RES_Y );\r
    float resRcp        = 1.0 / max( min( resMultX, resMultY ), 1.0 );\r
    float screenWidth   = floor( iResolution.x * resRcp );\r
    float screenHeight  = floor( iResolution.y * resRcp );\r
    float pixelX        = floor( gl_FragCoord.x * resRcp );\r
    float pixelY        = floor( gl_FragCoord.y * resRcp );  \r
    \r
    vec4 player         = LoadValue( txPlayer );\r
    vec4 playerState    = LoadValue( txPlayerState );\r
    vec4 playerDir      = LoadValue( txPlayerDir );\r
    vec4 camera         = LoadValue( txCamera );\r
    vec4 soldier0       = LoadValue( txSoldier0 );\r
    vec4 soldier1       = LoadValue( txSoldier1 );\r
    vec4 soldier2       = LoadValue( txSoldier2 );\r
    vec4 soldier0State  = LoadValue( txSoldier0State );\r
    vec4 soldier1State  = LoadValue( txSoldier1State );\r
    vec4 soldier2State  = LoadValue( txSoldier2State );\r
    vec4 sniper         = LoadValue( txSniper );\r
    vec4 turret0        = LoadValue( txTurret0 );\r
    vec4 turret1        = LoadValue( txTurret1 );\r
\r
    float worldX        = pixelX + camera.x;\r
    float worldY        = pixelY - 8.0;\r
    \r
    vec2 screenUV = gl_FragCoord.xy / iResolution.xy;\r
    vec3 color = texture( iChannel1, screenUV ).xyz;\r
            \r
    float sniperX = worldX - sniper.x + SNIPER_SIZE.x * 0.5;\r
    float sniperY = worldY - sniper.y;\r
    sniperX = sniper.z < 0.0 ? 24.0 - sniperX : sniperX;\r
    SpriteSniper( color, sniperX, sniperY );\r
    \r
    DrawTurret( color, turret0, worldX, worldY );\r
    DrawTurret( color, turret1, worldX, worldY );\r
    DrawSoldier( color, soldier0, soldier0State, worldX, worldY );\r
    DrawSoldier( color, soldier1, soldier1State, worldX, worldY );\r
    DrawSoldier( color, soldier2, soldier2State, worldX, worldY );\r
   \r
    // draw player\r
    float billX = worldX - player.x;\r
    float billY = worldY - player.y;\r
    billX = playerDir.w > 0.0 && fract( 3.0 * iTime ) < 0.5 ? 100.0 : billX;\r
    if ( playerState.x == STATE_PRONE )\r
    {\r
        billX += BILL_PRONE_SIZE.x * 0.5;\r
        billX = playerDir.z < 0.0 ? BILL_PRONE_SIZE.x - billX : billX;\r
        SpriteBillProne( color, billX, billY );\r
    }\r
    else if ( playerState.x == STATE_JUMP )\r
    {\r
        billX += BILL_JUMP_SIZE.x * 0.5;\r
        billX = playerDir.z < 0.0 ? BILL_JUMP_SIZE.x - billX : billX;\r
        SpriteBillJump( color, billX, billY, playerState.y );\r
    }\r
    else\r
    {           \r
        billX += BILL_RUN_SIZE.x * 0.5;\r
        billX = playerDir.z < 0.0 ? BILL_RUN_SIZE.x - billX : billX;        \r
\r
        if ( playerState.x == STATE_WATER || playerState.x == STATE_UNDER_WATER )\r
        {\r
            SpriteWaterCircle( color, billX, billY - 4.0 );\r
        }\r
        \r
        if ( playerState.x != STATE_WATER && playerState.x != STATE_UNDER_WATER )\r
        {\r
            SpriteBillLegs( color, billX, billY, playerState.y );            \r
        }\r
\r
        float torsoX = billX + ( playerState.y == 0.0 ? 0.0 : -2.0 );\r
        float torsoY = billY + ( playerState.x == STATE_WATER ? -8.0 : -20.0 );\r
        if ( playerState.x != STATE_UNDER_WATER )\r
        {\r
            if ( playerDir.y > 0.0 && abs( playerDir.x ) > 0.0 )\r
            {\r
                SpriteBillTorsoTR( color, torsoX - 2.0, torsoY + 1.0 );            \r
            }\r
            else if ( playerDir.y > 0.0 )        \r
            {\r
                SpriteBillTorsoT( color, torsoX, torsoY + 1.0 );\r
            }\r
            else if ( playerDir.y < 0.0 )\r
            {\r
                SpriteBillTorsoBR( color, torsoX, torsoY + 7.0 );\r
            }\r
            else\r
            {\r
                SpriteBillTorsoR( color, torsoX, torsoY + 1.0 );\r
            }\r
        }\r
    }\r
\r
    gl_FragColor = vec4( color, 1.0 );\r
}`,O=`// UI and some foreground stuff\r
\r
\r
uniform vec3      iResolution;           // viewport resolution (in pixels)\r
uniform float     iTime;                 // shader playback time (in seconds)\r
uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube\r
uniform sampler2D iChannel1;          // input channel. XX = 2D/Cube\r
\r
#define SPRITE_DEC_2( x, i ) mod( floor( i / pow( 2.0, mod( x, 24.0 ) ) ), 2.0 )\r
#define SPRITE_DEC_3( x, i ) mod( floor( i / pow( 4.0, mod( x, 11.0 ) ) ), 4.0 )\r
#define SPRITE_DEC_4( x, i ) mod( floor( i / pow( 4.0, mod( x, 8.0 ) ) ), 4.0 )\r
#define RGB( r, g, b ) vec3( float( r ) / 255.0, float( g ) / 255.0, float( b ) / 255.0 )\r
\r
const float NES_RES_X               = 224.0;\r
const float NES_RES_Y               = 192.0;\r
const float GAME_STATE_TITLE		= 0.0;\r
const float GAME_STATE_LEVEL		= 1.0;\r
const float GAME_STATE_LEVEL_DIE	= 2.0;\r
const float GAME_STATE_LEVEL_WIN	= 3.0;\r
const float GAME_STATE_GAME_OVER	= 4.0;\r
const float GAME_STATE_VICTORY		= 5.0;\r
const float WEAPON_RIFLE        	= 0.0;\r
const vec2  BULLET_SIZE         	= vec2( 3.0,  3.0  );\r
const vec2  POWER_UP_SIZE       	= vec2( 24.0, 14.0 );\r
const float UI_VICTORY_TIME			= 300.0;\r
\r
// storage\r
const vec2 txPlayer 			= vec2( 0.0, 0.0 ); 	// xy - pos, z - jump start, w - jump dir\r
const vec2 txPlayerState		= vec2( 1.0, 0.0 ); 	// x - state, y - frame, z - jump tick, w - lifes\r
const vec2 txPlayerDir			= vec2( 2.0, 0.0 ); 	// xy - dir, z - flip, w - immortality\r
const vec2 txPlayerWeapon		= vec2( 3.0, 0.0 ); 	// x - weapon, y - weapon cooldown, z - weapon fire rate, w - weapon bullet num\r
const vec2 txCamera 			= vec2( 4.0, 0.0 ); 	// x - cam offset, y - spawn counter, z - soldier spawn counter\r
const vec2 txSoldier0 			= vec2( 5.0, 0.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier1 			= vec2( 5.0, 1.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier2 			= vec2( 5.0, 2.0 ); 	// xy - pos, z - flip\r
const vec2 txSoldier0State 		= vec2( 6.0, 0.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier1State 		= vec2( 6.0, 1.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSoldier2State 		= vec2( 6.0, 2.0 ); 	// x - state, y - frame, z - jump tick\r
const vec2 txSniper	 			= vec2( 7.0, 0.0 ); 	// xy - pos, z - flip, w - weapon cooldown\r
const vec2 txPlayerBullet0 		= vec2( 8.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet1 		= vec2( 8.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet2 		= vec2( 8.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet3 		= vec2( 8.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet4 		= vec2( 8.0, 4.0 ); 	// xy - pos, xy - dir\r
const vec2 txPlayerBullet5 		= vec2( 8.0, 5.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet0 		= vec2( 9.0, 0.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet1 		= vec2( 9.0, 1.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet2 		= vec2( 9.0, 2.0 ); 	// xy - pos, xy - dir\r
const vec2 txEnemyBullet3 		= vec2( 9.0, 3.0 ); 	// xy - pos, xy - dir\r
const vec2 txExplosion 			= vec2( 10.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txHit 				= vec2( 11.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txTurret0			= vec2( 12.0, 0.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret1			= vec2( 12.0, 1.0 ); 	// xy - pos, z - angle\r
const vec2 txTurret0State		= vec2( 13.0, 0.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txTurret1State		= vec2( 13.0, 1.0 ); 	// x - HP, y - weapon cooldown\r
const vec2 txPowerUp			= vec2( 14.0, 0.0 ); 	// xy - pos, z - frame\r
const vec2 txPowerUpState		= vec2( 15.0, 0.0 ); 	// x - state, y - initial height, z - jump tick\r
const vec2 txBossCore			= vec2( 16.0, 0.0 ); 	// xy - pos, z - HP\r
const vec2 txBossCannon0		= vec2( 17.0, 0.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossCannon1		= vec2( 17.0, 1.0 ); 	// xy - pos, z - cooldown, w - HP\r
const vec2 txBossBullet0		= vec2( 18.0, 0.0 ); 	// xy - pos, zw - velocity\r
const vec2 txBossBullet1		= vec2( 18.0, 1.0 ); 	// xy - pos, zw - velocity\r
const vec2 txGameState			= vec2( 19.0, 0.0 ); 	// x - state, y - state tick\r
const vec2 txBridge				= vec2( 20.0, 0.0 ); 	// x - draw start, y - explode tick\r
\r
vec4 LoadValue( vec2 tx )\r
{\r
    return floor( texture( iChannel0, ( tx + 0.5 ) / iResolution.xy ) );\r
}\r
\r
float Rand( vec2 co )\r
{\r
    return fract( sin( dot( co.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );\r
}\r
\r
void SpritePowerBullet( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 4.0 ? ( x <= 7.0 ? 84.0 : 0.0 ) : idx;\r
    idx = y == 3.0 ? ( x <= 7.0 ? 349.0 : 0.0 ) : idx;\r
    idx = y == 2.0 ? ( x <= 7.0 ? 405.0 : 0.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 361.0 : 0.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 84.0 : 0.0 ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 5.0 ? idx : 0.0;\r
    \r
    color = idx == 1.0 ? RGB( 255,  46,   0 ) : color;\r
    color = idx == 2.0 ? RGB( 255, 112,  78 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteBullet( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 2.0 ? ( x <= 7.0 ? 4.0 : 0.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 7.0 ? 21.0 : 0.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 7.0 ? 4.0 : 0.0 ) : idx;\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 3.0 ? idx : 0.0;\r
    \r
    color = idx == 1.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteHit( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
    idx = y == 6.0 ? 608.0 : idx;\r
    idx = y == 5.0 ? 2056.0 : idx;\r
    idx = y == 4.0 ? 8194.0 : idx;\r
    idx = y == 3.0 ? 4097.0 : idx;\r
    idx = y == 2.0 ? 8194.0 : idx;\r
    idx = y == 1.0 ? 2056.0 : idx;\r
    idx = y == 0.0 ? 608.0 : idx;\r
\r
    idx = SPRITE_DEC_3( x, idx );\r
    idx = x >= 0.0 && x < 7.0 ? idx : 0.0;\r
    \r
    color = idx == 1.0 ? RGB( 228,  68,  52 ) : color;\r
    color = idx == 2.0 ? RGB( 255, 140, 124 ) : color;\r
}\r
\r
void SpriteExplosion( inout vec3 color, float x, float y, float frame )\r
{\r
    float idx = 0.0;\r
    \r
    x = abs( x );\r
    y = abs( y );\r
\r
    if ( frame == 0.0 )\r
    {\r
        idx = y == 11.0 ? ( x <= 7.0 ? 21.0 : 0.0 ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 342.0 : 0.0 ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 5541.0 : 0.0 ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 26990.0 : 0.0 ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 32182.0 : ( x <= 15.0 ? 1.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 39595.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 64183.0 : ( x <= 15.0 ? 6.0 : 0.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 44783.0 : ( x <= 15.0 ? 23.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 48127.0 : ( x <= 15.0 ? 22.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 44799.0 : ( x <= 15.0 ? 103.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 64511.0 : ( x <= 15.0 ? 90.0 : 0.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 49151.0 : ( x <= 15.0 ? 90.0 : 0.0 ) ) : idx;\r
    }\r
    else if ( frame == 1.0 )\r
    {\r
        idx = y == 13.0 ? ( x <= 7.0 ? 25.0 : 0.0 ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 1705.0 : 0.0 ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 23295.0 : 0.0 ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 32682.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 65232.0 : ( x <= 15.0 ? 22.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 58384.0 : ( x <= 15.0 ? 27.0 : 0.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 57600.0 : ( x <= 15.0 ? 107.0 : 0.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 41216.0 : ( x <= 15.0 ? 110.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 430.0 : 0.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 32768.0 : ( x <= 15.0 ? 430.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 442.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 4096.0 : ( x <= 15.0 ? 1462.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 1520.0 : 0.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 1460.0 : 0.0 ) ) : idx;\r
    }\r
    else\r
    {   \r
        idx = y == 15.0 ? ( x <= 7.0 ? 68.0 : 0.0 ) : idx;\r
        idx = y == 14.0 ? ( x <= 7.0 ? 1280.0 : 0.0 ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 16384.0 : 0.0 ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16.0 : 0.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 64.0 : 0.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 256.0 : 0.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 4096.0 : 0.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16384.0 : 0.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 16384.0 : 0.0 ) ) : idx;\r
        \r
    }\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 12.0 + frame * 2.0 ? idx : 0.0;\r
    \r
    color = idx == 1.0 ? RGB( 228,  68,  52 ) : color;\r
    color = idx == 2.0 ? RGB( 255, 140, 124 ) : color;\r
    color = idx == 3.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpritePowerUp( inout vec3 color, float x, float y, float frame )\r
{\r
    float idx = 0.0;    \r
    \r
    if ( frame == 0.0 )\r
    {\r
        idx = y == 13.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5460.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 32765.0 : 1.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 54272.0 : ( x <= 15.0 ? 54615.0 : 23.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 23808.0 : ( x <= 15.0 ? 31421.0 : 117.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 55104.0 : ( x <= 15.0 ? 65215.0 : 471.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 40276.0 : ( x <= 15.0 ? 43690.0 : 5494.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 57193.0 : ( x <= 15.0 ? 43690.0 : 27127.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 57193.0 : ( x <= 15.0 ? 64175.0 : 27127.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 56660.0 : ( x <= 15.0 ? 65215.0 : 5495.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 55104.0 : ( x <= 15.0 ? 64175.0 : 471.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 23808.0 : ( x <= 15.0 ? 27305.0 : 117.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 54272.0 : ( x <= 15.0 ? 54615.0 : 23.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 16384.0 : ( x <= 15.0 ? 32765.0 : 1.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 5460.0 : 0.0 ) ) : idx;\r
    }\r
    else\r
    {\r
        idx = y == 14.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 320.0 : 0.0 ) ) : idx;\r
        idx = y == 13.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 1744.0 : 0.0 ) ) : idx;\r
        idx = y == 12.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 6836.0 : 0.0 ) ) : idx;\r
        idx = y == 11.0 ? ( x <= 7.0 ? 2389.0 : ( x <= 15.0 ? 1680.0 : 21856.0 ) ) : idx;\r
        idx = y == 10.0 ? ( x <= 7.0 ? 8123.0 : ( x <= 15.0 ? 21845.0 : 61172.0 ) ) : idx;\r
        idx = y == 9.0 ? ( x <= 7.0 ? 31078.0 : ( x <= 15.0 ? 26969.0 : 39277.0 ) ) : idx;\r
        idx = y == 8.0 ? ( x <= 7.0 ? 42669.0 : ( x <= 15.0 ? 27241.0 : 31386.0 ) ) : idx;\r
        idx = y == 7.0 ? ( x <= 7.0 ? 39252.0 : ( x <= 15.0 ? 27305.0 : 5478.0 ) ) : idx;\r
        idx = y == 6.0 ? ( x <= 7.0 ? 27344.0 : ( x <= 15.0 ? 27305.0 : 1961.0 ) ) : idx;\r
        idx = y == 5.0 ? ( x <= 7.0 ? 42304.0 : ( x <= 15.0 ? 27033.0 : 346.0 ) ) : idx;\r
        idx = y == 4.0 ? ( x <= 7.0 ? 44288.0 : ( x <= 15.0 ? 26969.0 : 122.0 ) ) : idx;\r
        idx = y == 3.0 ? ( x <= 7.0 ? 21504.0 : ( x <= 15.0 ? 26969.0 : 21.0 ) ) : idx;\r
        idx = y == 2.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 26969.0 : 0.0 ) ) : idx;\r
        idx = y == 1.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 26969.0 : 0.0 ) ) : idx;\r
        idx = y == 0.0 ? ( x <= 7.0 ? 0.0 : ( x <= 15.0 ? 21845.0 : 0.0 ) ) : idx;\r
    }\r
\r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 24.0 ? idx : 0.0;    \r
    \r
    color = idx == 1.0 ? RGB( 0,    0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 228,  68,  52  ) : color;\r
    color = idx == 3.0 ? RGB( 255,  184, 168 ) : color;\r
}\r
\r
void SpriteLife( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
    \r
    idx = y == 15.0 ? 21845.0 : idx;\r
    idx = y == 14.0 ? 26985.0 : idx;\r
    idx = y == 13.0 ? 26985.0 : idx;\r
    idx = y == 12.0 ? 26985.0 : idx;\r
    idx = y == 11.0 ? 26985.0 : idx;\r
    idx = y == 10.0 ? 6500.0 : idx;\r
    idx = y == 9.0 ? 1360.0 : idx;\r
    idx = y == 8.0 ? 1744.0 : idx;\r
    idx = y == 7.0 ? 1360.0 : idx;\r
    idx = y == 6.0 ? 7140.0 : idx;\r
    idx = y == 5.0 ? 28345.0 : idx;\r
    idx = y == 4.0 ? 31725.0 : idx;\r
    idx = y == 3.0 ? 31725.0 : idx;\r
    idx = y == 2.0 ? 28345.0 : idx;\r
    idx = y == 1.0 ? 7140.0 : idx;\r
    idx = y == 0.0 ? 1360.0 : idx;    \r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    \r
    color = idx == 1.0 ? RGB( 0,    0,   0   ) : color;\r
    color = idx == 2.0 ? RGB( 48,   31,  252 ) : color;\r
    color = idx == 3.0 ? RGB( 255,  218, 144 ) : color;\r
}\r
\r
void SpriteStage1( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
\r
    idx = y == 6.0 ? ( x <= 23.0 ? 4095806.0 : ( x <= 47.0 ? 32574.0 : 30.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 23.0 ? 8330311.0 : ( x <= 47.0 ? 1895.0 : 28.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 23.0 ? 7412743.0 : ( x <= 47.0 ? 1799.0 : 28.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 23.0 ? 7412798.0 : ( x <= 47.0 ? 32631.0 : 28.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 23.0 ? 8330352.0 : ( x <= 47.0 ? 1895.0 : 28.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 23.0 ? 7412851.0 : ( x <= 47.0 ? 1911.0 : 28.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 23.0 ? 7412798.0 : ( x <= 47.0 ? 32606.0 : 62.0 ) ) : idx;\r
    \r
    idx = SPRITE_DEC_2( x, idx );\r
    idx = x >= 0.0 && x < 54.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteJungle( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
\r
    idx = y == 6.0 ? ( x <= 23.0 ? 6776700.0 : 8324926.0 ) : idx;\r
    idx = y == 5.0 ? ( x <= 23.0 ? 7300920.0 : 460647.0 ) : idx;\r
    idx = y == 4.0 ? ( x <= 23.0 ? 8087352.0 : 460551.0 ) : idx;\r
    idx = y == 3.0 ? ( x <= 23.0 ? 7563064.0 : 8324983.0 ) : idx;\r
    idx = y == 2.0 ? ( x <= 23.0 ? 6514489.0 : 460647.0 ) : idx;\r
    idx = y == 1.0 ? ( x <= 23.0 ? 6514489.0 : 460663.0 ) : idx;\r
    idx = y == 0.0 ? ( x <= 23.0 ? 6503966.0 : 8355678.0 ) : idx;\r
\r
    idx = SPRITE_DEC_2( x, idx );\r
    idx = x >= 0.0 && x < 47.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteGameOver( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
\r
    idx = y == 6.0 ? ( x <= 23.0 ? 6503998.0 : ( x <= 47.0 ? 4063359.0 : 4161399.0 ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 23.0 ? 7831399.0 : ( x <= 47.0 ? 7536647.0 : 6752119.0 ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 23.0 ? 8352007.0 : ( x <= 47.0 ? 7536647.0 : 6752054.0 ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 23.0 ? 6123895.0 : ( x <= 47.0 ? 7536767.0 : 4161334.0 ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 23.0 ? 4816743.0 : ( x <= 47.0 ? 7536647.0 : 3606300.0 ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 23.0 ? 4288887.0 : ( x <= 47.0 ? 8323079.0 : 6752028.0 ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 23.0 ? 4288862.0 : ( x <= 47.0 ? 4063359.0 : 6782728.0 ) ) : idx;\r
\r
    idx = SPRITE_DEC_2( x, idx );\r
    idx = x >= 0.0 && x < 71.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void SpriteHelicopter( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;    \r
    \r
	idx = y == 10.0 ? ( x <= 7.0 ? 0.0 : 32768.0 ) : idx;\r
	idx = y == 9.0 ? ( x <= 7.0 ? 0.0 : 28672.0 ) : idx;\r
	idx = y == 8.0 ? ( x <= 7.0 ? 0.0 : 24672.0 ) : idx;\r
	idx = y == 7.0 ? ( x <= 7.0 ? 0.0 : 6155.0 ) : idx;\r
	idx = y == 6.0 ? ( x <= 7.0 ? 57344.0 : 1600.0 ) : idx;\r
	idx = y == 5.0 ? ( x <= 7.0 ? 6400.0 : 424.0 ) : idx;\r
	idx = y == 4.0 ? ( x <= 7.0 ? 36944.0 : 106.0 ) : idx;\r
	idx = y == 3.0 ? ( x <= 7.0 ? 58373.0 : 27.0 ) : idx;\r
	idx = y == 2.0 ? ( x <= 7.0 ? 57600.0 : 26.0 ) : idx;\r
	idx = y == 1.0 ? ( x <= 7.0 ? 43264.0 : 5.0 ) : idx;\r
	idx = y == 0.0 ? ( x <= 7.0 ? 21760.0 : 0.0 ) : idx;\r
    \r
    idx = SPRITE_DEC_4( x, idx );\r
    idx = x >= 0.0 && x < 16.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 0,   91,  0 )   : color;\r
    color = idx == 2.0 ? RGB( 0,   171, 71 )  : color;\r
    color = idx == 3.0 ? RGB( 184, 248, 216 ) : color;\r
}\r
\r
void SpriteVictory( inout vec3 color, float x, float y )\r
{\r
    float idx = 0.0;\r
\r
    idx = y == 6.0 ? ( x <= 23.0 ? 6766142.0 : ( x <= 47.0 ? 4079422.0 : ( x <= 71.0 ? 485247.0 : ( x <= 95.0 ? 4095806.0 : ( x <= 119.0 ? 4089662.0 : 28.0 ) ) ) ) ) : idx;\r
    idx = y == 5.0 ? ( x <= 23.0 ? 7304039.0 : ( x <= 47.0 ? 8349543.0 : ( x <= 71.0 ? 485148.0 : ( x <= 95.0 ? 1842303.0 : ( x <= 119.0 ? 4681587.0 : 28.0 ) ) ) ) ) : idx;\r
    idx = y == 4.0 ? ( x <= 23.0 ? 8090471.0 : ( x <= 47.0 ? 7431943.0 : ( x <= 71.0 ? 485148.0 : ( x <= 95.0 ? 1842289.0 : ( x <= 119.0 ? 490355.0 : 28.0 ) ) ) ) ) : idx;\r
    idx = y == 3.0 ? ( x <= 23.0 ? 7566087.0 : ( x <= 47.0 ? 7421815.0 : ( x <= 71.0 ? 485148.0 : ( x <= 95.0 ? 1842289.0 : ( x <= 119.0 ? 4092787.0 : 28.0 ) ) ) ) ) : idx;\r
    idx = y == 2.0 ? ( x <= 23.0 ? 6517607.0 : ( x <= 47.0 ? 8337255.0 : ( x <= 71.0 ? 485148.0 : ( x <= 95.0 ? 1842303.0 : ( x <= 119.0 ? 7365491.0 : 0.0 ) ) ) ) ) : idx;\r
    idx = y == 1.0 ? ( x <= 23.0 ? 6520679.0 : ( x <= 47.0 ? 7432055.0 : ( x <= 71.0 ? 485148.0 : ( x <= 95.0 ? 1842289.0 : ( x <= 119.0 ? 7562111.0 : 0.0 ) ) ) ) ) : idx;\r
    idx = y == 0.0 ? ( x <= 23.0 ? 6503998.0 : ( x <= 47.0 ? 7432030.0 : ( x <= 71.0 ? 8338972.0 : ( x <= 95.0 ? 4070513.0 : ( x <= 119.0 ? 4088638.0 : 28.0 ) ) ) ) ) : idx;\r
\r
    idx = SPRITE_DEC_2( x, idx );\r
    idx = x >= 0.0 && x < 125.0 ? idx : 0.0;\r
\r
    color = idx == 1.0 ? RGB( 255, 255, 255 ) : color;\r
}\r
\r
void main(){    \r
    // we want 224x192 (overscan) and we want multiples of pixel size\r
    float resMultX      = floor( iResolution.x / NES_RES_X );\r
    float resMultY      = floor( iResolution.y / NES_RES_Y );\r
    float resRcp        = 1.0 / max( min( resMultX, resMultY ), 1.0 );\r
    float screenWidth   = floor( iResolution.x * resRcp );\r
    float screenHeight  = floor( iResolution.y * resRcp );\r
    float pixelX        = floor( gl_FragCoord.x * resRcp );\r
    float pixelY        = floor( gl_FragCoord.y * resRcp );   \r
    \r
    vec4 playerState    = LoadValue( txPlayerState );\r
    vec4 playerWeapon   = LoadValue( txPlayerWeapon );    \r
    vec4 camera         = LoadValue( txCamera );\r
    vec4 playerBullet0  = LoadValue( txPlayerBullet0 );\r
    vec4 playerBullet1  = LoadValue( txPlayerBullet1 );\r
    vec4 playerBullet2  = LoadValue( txPlayerBullet2 );\r
    vec4 playerBullet3  = LoadValue( txPlayerBullet3 );\r
    vec4 playerBullet4  = LoadValue( txPlayerBullet4 );\r
    vec4 playerBullet5  = LoadValue( txPlayerBullet5 );\r
    vec4 enemyBullet0   = LoadValue( txEnemyBullet0 );\r
    vec4 enemyBullet1   = LoadValue( txEnemyBullet1 );\r
    vec4 enemyBullet2   = LoadValue( txEnemyBullet2 );\r
    vec4 enemyBullet3   = LoadValue( txEnemyBullet3 );\r
    vec4 bossBullet0	= LoadValue( txBossBullet0 );\r
    vec4 bossBullet1	= LoadValue( txBossBullet1 );\r
    vec4 powerUp        = LoadValue( txPowerUp );    \r
    vec4 explosion      = LoadValue( txExplosion );\r
    vec4 hit            = LoadValue( txHit );    \r
    vec4 gameState      = LoadValue( txGameState );\r
\r
    float worldX        = pixelX + camera.x;\r
    float worldY        = pixelY - 8.0;    \r
\r
    vec2 screenUV = gl_FragCoord.xy / iResolution.xy;\r
    vec3 color = texture( iChannel1, screenUV ).xyz; \r
    \r
    SpritePowerUp( color, worldX - powerUp.x + POWER_UP_SIZE.x * 0.5, worldY - powerUp.y, powerUp.z );\r
    if ( playerWeapon.x == WEAPON_RIFLE ){\r
        SpriteBullet( color, worldX - playerBullet0.x + 1.0, worldY - playerBullet0.y );\r
        SpriteBullet( color, worldX - playerBullet1.x + 1.0, worldY - playerBullet1.y );\r
        SpriteBullet( color, worldX - playerBullet2.x + 1.0, worldY - playerBullet2.y );\r
        SpriteBullet( color, worldX - playerBullet3.x + 1.0, worldY - playerBullet3.y );\r
        SpriteBullet( color, worldX - playerBullet4.x + 1.0, worldY - playerBullet4.y );\r
        SpriteBullet( color, worldX - playerBullet5.x + 1.0, worldY - playerBullet5.y );\r
    }else{\r
        SpritePowerBullet( color, worldX - playerBullet0.x + 2.0, worldY - playerBullet0.y );\r
        SpritePowerBullet( color, worldX - playerBullet1.x + 2.0, worldY - playerBullet1.y );\r
        SpritePowerBullet( color, worldX - playerBullet2.x + 2.0, worldY - playerBullet2.y );\r
        SpritePowerBullet( color, worldX - playerBullet3.x + 2.0, worldY - playerBullet3.y );\r
        SpritePowerBullet( color, worldX - playerBullet4.x + 2.0, worldY - playerBullet4.y );\r
        SpritePowerBullet( color, worldX - playerBullet5.x + 2.0, worldY - playerBullet5.y );\r
    }\r
    SpriteBullet( color, worldX - enemyBullet0.x + 1.0, worldY - enemyBullet0.y );\r
    SpriteBullet( color, worldX - enemyBullet1.x + 1.0, worldY - enemyBullet1.y );\r
    SpriteBullet( color, worldX - enemyBullet2.x + 1.0, worldY - enemyBullet2.y );\r
    SpriteBullet( color, worldX - enemyBullet3.x + 1.0, worldY - enemyBullet3.y );\r
	SpritePowerBullet( color, worldX - bossBullet0.x + 2.0, worldY - bossBullet0.y );\r
	SpritePowerBullet( color, worldX - bossBullet1.x + 2.0, worldY - bossBullet1.y );    \r
    SpriteExplosion( color, worldX - explosion.x, worldY - explosion.y, explosion.z );\r
    SpriteHit( color, worldX - hit.x, worldY - hit.y );      \r
    \r
    if ( pixelX > 32.0 && pixelX < 32.0 + 8.0 * ( playerState.w - 1.0 ) ) {\r
        SpriteLife( color, pixelX, pixelY - screenHeight + 32.0 );\r
    }\r
    \r
    if ( gameState.x == GAME_STATE_TITLE ){\r
        color = vec3( 0.0 );\r
        SpriteStage1( color, pixelX - floor( screenWidth * 0.5 - 30.5 ), pixelY - floor( screenHeight * 0.5 - 10.5 ) );\r
        SpriteJungle( color, pixelX - floor( screenWidth * 0.5 - 30.5 ), pixelY - floor( screenHeight * 0.5 + 10.5 ) );\r
        // color = vec3(1.0,1.0,.0);\r
    }else if ( gameState.x == GAME_STATE_GAME_OVER ){\r
        color = vec3( 0.0 );\r
        SpriteGameOver( color, pixelX - floor( screenWidth * 0.5 - 36.5 ), pixelY - floor( screenHeight * 0.5 ) );\r
        // color = vec3(1.0,0.0,.0);\r
    }else if ( gameState.x == GAME_STATE_VICTORY ){\r
        // water / sky\r
        color = pixelY < 80.0 ? RGB( 0, 112, 236 ) : vec3( 0.0 );\r
        \r
        // stars\r
        float starRand = Rand( vec2( worldX * 0.01, worldY * 0.01 ) );\r
        if ( starRand > 0.998 && worldY > 130.0 ){\r
            color = fract( iTime + starRand * 113.17 + worldX * 3.14 ) < 0.5 ? RGB( 255, 255, 255 ) : RGB( 0, 112, 236 );\r
        }        \r
        \r
        SpriteVictory( color, pixelX - floor( screenWidth * 0.5 - 63.5 ), pixelY - floor( screenHeight * 0.5 ) - 20.0 );\r
        SpriteHelicopter( color, floor( pixelX - screenWidth * ( 0.25 + 0.5 * ( 1.0 - gameState.y / UI_VICTORY_TIME ) ) ), pixelY - 90.0 );\r
        // color = vec3(0.0,0.0,1.0);\r
    }else if ( gameState.x == GAME_STATE_LEVEL ){\r
		float fadeAlpha = clamp( ( gameState.y - 30.0 ) / 30.0, 0.0, 1.0 );\r
        color = pixelX < fadeAlpha * screenWidth ? color : vec3( 0.0 );\r
        // color = vec3(1.0,0.0,.0);\r
    }\r
    \r
    gl_FragColor = vec4( color, 1.0 );\r
}`,k=`uniform vec3      iResolution;           // viewport resolution (in pixels)\r
uniform sampler2D iChannel0;          // input channel. XX = 2D/Cube\r
#define POST_PROCESS\r
\r
\r
\r
vec2 CRTCurveUV( vec2 uv, float str )\r
{\r
    uv = uv * 2.0 - 1.0;\r
    vec2 offset = ( str * abs( uv.yx ) ) / vec2( 6.0, 4.0 );\r
    uv = uv + uv * offset * offset;\r
    uv = uv * 0.5 + 0.5;\r
    return uv;\r
}\r
\r
void main()\r
{\r
    vec2 baseUV = gl_FragCoord.xy / iResolution.xy;\r
    \r
#ifdef POST_PROCESS    \r
    vec2 uv = CRTCurveUV( baseUV, 0.5 );\r
    \r
    // chromatic abberation\r
	float caStrength    = 0.003;\r
    vec2 caOffset       = uv - 0.5;\r
    //caOffset = vec2( 1.0, 0.0 ) * 0.3;\r
    vec2 caUVG          = uv + caOffset * caStrength;\r
    vec2 caUVB          = uv + caOffset * caStrength * 2.0;\r
    \r
    vec3 color;\r
    color.x = texture( iChannel0, uv ).x;\r
    color.y = texture( iChannel0, caUVG ).y;\r
    color.z = texture( iChannel0, caUVB ).z;\r
    \r
    uv = CRTCurveUV( baseUV, 1.0 );\r
    if ( uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 )\r
    {\r
        color = vec3( 0.0, 0.0, 0.0 );\r
    }    \r
    float vignette = uv.x * uv.y * ( 1.0 - uv.x ) * ( 1.0 - uv.y );\r
    vignette = clamp( pow( 16.0 * vignette, 0.3 ), 0.0, 1.0 );\r
    color *= vignette * 1.1;\r
    \r
    // color = vec3(gl_FragCoord.X,0.0,0.0);\r
#else\r
    vec3 color = texture( vec3(1.0,1.0,0.0), baseUV ).xyz;\r
    // vec3 color = vec3(1.0,0.0,0.0);\r
#endif\r
    \r
    gl_FragColor = vec4( color, 1.0 );\r
}`,Z=u=>(z("data-v-bc3dc229"),u=u(),W(),u),F={id:"shader"},J=Z(()=>f("div",{class:"info"},[f("div",null,"射击：A"),f("div",null,"跳跃：space"),f("div",null,"移动：方向键")],-1)),j=[J],K=G({__name:"contra",setup(u){let B=Y(null);return U(()=>{const o=document.getElementById("shader"),S=new P,x={width:o.offsetWidth,height:o.offsetHeight};window.addEventListener("resize",()=>{x.width=window.innerWidth,x.height=window.innerHeight,i.aspect=x.width/x.height,i.updateProjectionMatrix(),n.setSize(x.width,x.height),n.setPixelRatio(Math.min(window.devicePixelRatio,2))});const i=new R(75,x.width/x.height,.1,100);i.position.set(0,0,.587),S.add(i);const n=new w({antialias:!0});n.setSize(x.width,x.height),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),o==null||o.appendChild(n.domElement);let l,y,d,a,c,t={Left:!1,Right:!1,Up:!1,Down:!1,Jump:!1,Shoot:!1};const g=e=>{switch(e.keyCode){case 37:t.Left=!0;break;case 39:t.Right=!0;break;case 38:t.Up=!0;break;case 40:t.Down=!0;break;case 32:t.Jump=!0;break;case 65:t.Shoot=!0;break}},v=e=>{switch(e.keyCode){case 37:t.Left=!1;break;case 39:t.Right=!1;break;case 38:t.Up=!1;break;case 40:t.Down=!1;break;case 32:t.Jump=!1;break;case 65:t.Shoot=!1;break}console.log(e)};window.addEventListener("keydown",g),window.addEventListener("keyup",v);{const{width:e,height:p}=n.getSize(new m),r=new X(e,p,n.pixelRatio);l=new s(n,i,V,{iTime:{value:0},iResolution:{value:r},iChannel0:{value:null},iFrame:{value:0},customLeft:{value:0},customUp:{value:0},customDown:{value:0},customRight:{value:0},customJump:{value:0},customShoot:{value:0}},r.x,r.y),y=new s(n,i,H,{iTime:{value:0},iResolution:{value:r},iChannel0:{value:null}},r.x,r.y),d=new s(n,i,M,{iTime:{value:0},iResolution:{value:r},iChannel0:{value:null},iChannel1:{value:null}},r.x,r.y),a=new s(n,i,O,{iTime:{value:0},iResolution:{value:r},iChannel0:{value:null},iChannel1:{value:null}},r.x,r.y),c=new s(n,i,k,{iResolution:{value:r},iChannel0:{value:null}},r.x,r.y);const T=new I(new L(1.6,.9),new C({map:c.readBuffer.texture}));S.add(T)}const _=new A,E=()=>{if(c){const e=_.getDelta();c.uniforms.iChannel0.value=a.readBuffer.texture,c.render();for(let p in t)l.uniforms["custom"+p].value=t[p]?2:0;l.uniforms.iTime.value+=e,l.uniforms.iChannel0.value=l.readBuffer.texture,l.uniforms.iFrame.value++,l.render(),y.uniforms.iTime.value+=e,y.uniforms.iChannel0.value=l.readBuffer.texture,y.render(),d.uniforms.iTime.value+=e,d.uniforms.iChannel0.value=l.readBuffer.texture,d.uniforms.iChannel1.value=y.readBuffer.texture,d.render(),a.uniforms.iTime.value+=e,a.uniforms.iChannel0.value=l.readBuffer.texture,a.uniforms.iChannel1.value=d.readBuffer.texture,a.render()}n.render(S,i),B.value=window.requestAnimationFrame(E)};E()}),h(()=>{console.log(11111111111),cancelAnimationFrame(B.value)}),(o,S)=>(D(),N("div",F,j))}});const r0=b(K,[["__scopeId","data-v-bc3dc229"]]);export{r0 as default};
