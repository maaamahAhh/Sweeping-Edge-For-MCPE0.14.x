/*
    Sweeping Edge ModPE script for MCPE 0.14.x
    Requires BlockLauncher to load.
    Created by maaamahAhh
    GitHub: https://github.com/maaamahAhh/Sweeping-Edge-For-MCPE0.14.x
*/


var entityList = [];

function entityAddedHook(entity){
    entityList.push(entity);
}

var SWORD_IDS = [268, 272, 267, 283, 276];

function isSword(id){
    for(var i=0;i<SWORD_IDS.length;i++){
        if(SWORD_IDS[i]===id) return true;
    }
    return false;
}

function attackHook(attacker, victim){
    var player = Player.getEntity();
    if(attacker != player) return;

    var id = Player.getCarriedItem();
    if(!isSword(id)) return;

    var radius = 3;

    for(var i=0;i<entityList.length;i++){
        var ent = entityList[i];
        if(ent == player || ent == victim) continue;

        var ex = Entity.getX(ent);
        var ey = Entity.getY(ent);
        var ez = Entity.getZ(ent);

        var vx = Entity.getX(victim);
        var vy = Entity.getY(victim);
        var vz = Entity.getZ(victim);

        var dx = ex - vx;
        var dy = ey - vy;
        var dz = ez - vz;

        if(dx*dx + dz*dz <= radius*radius && Math.abs(dy) <= 1){
            var idType = Entity.getEntityTypeId(ent);

            Entity.setHealth(ent, Entity.getHealth(ent) - 2); 

            if(!Player.isPlayer(ent) &&
               idType != EntityType.ARROW && idType != EntityType.ITEM && idType != EntityType.BOAT &&
               idType != EntityType.EXPERIENCE_ORB && idType != EntityType.FALLING_BLOCK &&
               idType != EntityType.LIGHTNING_BOLT && idType != EntityType.MINECART &&
               idType != EntityType.PAINTING && idType != EntityType.PRIMED_TNT &&
               idType != EntityType.SNOWBALL && idType != EntityType.THROWN_POTION){

                if(idType == EntityType.ZOMBIE || idType == EntityType.SKELETON || idType == EntityType.PIG_ZOMBIE || idType == EntityType.ZOMBIE_VILLAGER){
                    Entity.addEffect(ent, MobEffect.heal, 1, 0, false, false);
                }else{
                    Entity.addEffect(ent, MobEffect.harm, 1, 0, false, false);
                }
                Level.addParticle(ParticleType.hugeexplosion, vx, vy - 3.5, vz, 0, 0, 0, 1);
                Level.addParticle(ParticleType.largeexplode, vx, vy + 0.5, vz, 0, 0, 0, 1);
            }
        }
    }
}
