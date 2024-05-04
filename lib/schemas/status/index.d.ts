import { z } from 'zod';
import { clientErrorStatusSchema } from './client';
import { informationStatusSchema } from './information';
import { permissionStatusSchema } from './permission';
import { redirectStatusSchema } from './redirect';
import { serverErrorStatusSchema } from './server';
import { successStatusSchema } from './successfull';
import { timeoutErrorStatusSchema } from './timeout';
export { clientErrorStatusSchema, informationStatusSchema, permissionStatusSchema, redirectStatusSchema, serverErrorStatusSchema, successStatusSchema as successfullStatusSchema, timeoutErrorStatusSchema, };
export declare const statusSchema: z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<400>, z.ZodLiteral<401>, z.ZodLiteral<402>, z.ZodLiteral<403>, z.ZodLiteral<404>, z.ZodLiteral<405>, z.ZodLiteral<406>, z.ZodLiteral<407>, z.ZodLiteral<408>, z.ZodLiteral<409>, z.ZodLiteral<410>, z.ZodLiteral<411>, z.ZodLiteral<412>, z.ZodLiteral<413>, z.ZodLiteral<414>, z.ZodLiteral<415>, z.ZodLiteral<416>, z.ZodLiteral<417>, z.ZodLiteral<418>, z.ZodLiteral<419>, z.ZodLiteral<420>, z.ZodLiteral<421>, z.ZodLiteral<422>, z.ZodLiteral<423>, z.ZodLiteral<424>, z.ZodLiteral<425>, z.ZodLiteral<426>, z.ZodLiteral<427>, z.ZodLiteral<428>, z.ZodLiteral<429>, z.ZodLiteral<430>, z.ZodLiteral<431>, z.ZodLiteral<432>, z.ZodLiteral<433>, z.ZodLiteral<434>, z.ZodLiteral<435>, z.ZodLiteral<436>, z.ZodLiteral<437>, z.ZodLiteral<438>, z.ZodLiteral<439>, z.ZodLiteral<440>, z.ZodLiteral<441>, z.ZodLiteral<442>, z.ZodLiteral<443>, z.ZodLiteral<444>, z.ZodLiteral<445>, z.ZodLiteral<446>, z.ZodLiteral<447>, z.ZodLiteral<448>, z.ZodLiteral<449>, z.ZodLiteral<450>, z.ZodLiteral<451>, z.ZodLiteral<452>, z.ZodLiteral<453>, z.ZodLiteral<454>, z.ZodLiteral<455>, z.ZodLiteral<456>, z.ZodLiteral<457>, z.ZodLiteral<458>, z.ZodLiteral<459>, z.ZodLiteral<460>, z.ZodLiteral<461>, z.ZodLiteral<462>, z.ZodLiteral<463>, z.ZodLiteral<464>, z.ZodLiteral<465>, z.ZodLiteral<466>, z.ZodLiteral<467>, z.ZodLiteral<468>, z.ZodLiteral<469>, z.ZodLiteral<470>, z.ZodLiteral<471>, z.ZodLiteral<472>, z.ZodLiteral<473>, z.ZodLiteral<474>, z.ZodLiteral<475>, z.ZodLiteral<476>, z.ZodLiteral<477>, z.ZodLiteral<478>, z.ZodLiteral<479>, z.ZodLiteral<480>, z.ZodLiteral<481>, z.ZodLiteral<482>, z.ZodLiteral<483>, z.ZodLiteral<484>, z.ZodLiteral<485>, z.ZodLiteral<486>, z.ZodLiteral<487>, z.ZodLiteral<488>, z.ZodLiteral<489>, z.ZodLiteral<490>, z.ZodLiteral<491>, z.ZodLiteral<492>, z.ZodLiteral<493>, z.ZodLiteral<494>, z.ZodLiteral<495>, z.ZodLiteral<496>, z.ZodLiteral<497>, z.ZodLiteral<498>, z.ZodLiteral<499>]>, z.ZodUnion<[z.ZodLiteral<100>, z.ZodLiteral<101>, z.ZodLiteral<102>, z.ZodLiteral<103>, z.ZodLiteral<104>, z.ZodLiteral<105>, z.ZodLiteral<106>, z.ZodLiteral<107>, z.ZodLiteral<108>, z.ZodLiteral<109>, z.ZodLiteral<110>, z.ZodLiteral<111>, z.ZodLiteral<112>, z.ZodLiteral<113>, z.ZodLiteral<114>, z.ZodLiteral<115>, z.ZodLiteral<116>, z.ZodLiteral<117>, z.ZodLiteral<118>, z.ZodLiteral<119>, z.ZodLiteral<120>, z.ZodLiteral<121>, z.ZodLiteral<122>, z.ZodLiteral<123>, z.ZodLiteral<124>, z.ZodLiteral<125>, z.ZodLiteral<126>, z.ZodLiteral<127>, z.ZodLiteral<128>, z.ZodLiteral<129>, z.ZodLiteral<130>, z.ZodLiteral<131>, z.ZodLiteral<132>, z.ZodLiteral<133>, z.ZodLiteral<134>, z.ZodLiteral<135>, z.ZodLiteral<136>, z.ZodLiteral<137>, z.ZodLiteral<138>, z.ZodLiteral<139>, z.ZodLiteral<140>, z.ZodLiteral<141>, z.ZodLiteral<142>, z.ZodLiteral<143>, z.ZodLiteral<144>, z.ZodLiteral<145>, z.ZodLiteral<146>, z.ZodLiteral<147>, z.ZodLiteral<148>, z.ZodLiteral<149>, z.ZodLiteral<150>, z.ZodLiteral<151>, z.ZodLiteral<152>, z.ZodLiteral<153>, z.ZodLiteral<154>, z.ZodLiteral<155>, z.ZodLiteral<156>, z.ZodLiteral<157>, z.ZodLiteral<158>, z.ZodLiteral<159>, z.ZodLiteral<160>, z.ZodLiteral<161>, z.ZodLiteral<162>, z.ZodLiteral<163>, z.ZodLiteral<164>, z.ZodLiteral<165>, z.ZodLiteral<166>, z.ZodLiteral<167>, z.ZodLiteral<168>, z.ZodLiteral<169>, z.ZodLiteral<170>, z.ZodLiteral<171>, z.ZodLiteral<172>, z.ZodLiteral<173>, z.ZodLiteral<174>, z.ZodLiteral<175>, z.ZodLiteral<176>, z.ZodLiteral<177>, z.ZodLiteral<178>, z.ZodLiteral<179>, z.ZodLiteral<180>, z.ZodLiteral<181>, z.ZodLiteral<182>, z.ZodLiteral<183>, z.ZodLiteral<184>, z.ZodLiteral<185>, z.ZodLiteral<186>, z.ZodLiteral<187>, z.ZodLiteral<188>, z.ZodLiteral<189>, z.ZodLiteral<190>, z.ZodLiteral<191>, z.ZodLiteral<192>, z.ZodLiteral<193>, z.ZodLiteral<194>, z.ZodLiteral<195>, z.ZodLiteral<196>, z.ZodLiteral<197>, z.ZodLiteral<198>, z.ZodLiteral<199>]>, z.ZodUnion<[z.ZodLiteral<600>, z.ZodLiteral<601>, z.ZodLiteral<602>, z.ZodLiteral<603>, z.ZodLiteral<604>, z.ZodLiteral<605>, z.ZodLiteral<606>, z.ZodLiteral<607>, z.ZodLiteral<608>, z.ZodLiteral<609>, z.ZodLiteral<610>, z.ZodLiteral<611>, z.ZodLiteral<612>, z.ZodLiteral<613>, z.ZodLiteral<614>, z.ZodLiteral<615>, z.ZodLiteral<616>, z.ZodLiteral<617>, z.ZodLiteral<618>, z.ZodLiteral<619>, z.ZodLiteral<620>, z.ZodLiteral<621>, z.ZodLiteral<622>, z.ZodLiteral<623>, z.ZodLiteral<624>, z.ZodLiteral<625>, z.ZodLiteral<626>, z.ZodLiteral<627>, z.ZodLiteral<628>, z.ZodLiteral<629>, z.ZodLiteral<630>, z.ZodLiteral<631>, z.ZodLiteral<632>, z.ZodLiteral<633>, z.ZodLiteral<634>, z.ZodLiteral<635>, z.ZodLiteral<636>, z.ZodLiteral<637>, z.ZodLiteral<638>, z.ZodLiteral<639>, z.ZodLiteral<640>, z.ZodLiteral<641>, z.ZodLiteral<642>, z.ZodLiteral<643>, z.ZodLiteral<644>, z.ZodLiteral<645>, z.ZodLiteral<646>, z.ZodLiteral<647>, z.ZodLiteral<648>, z.ZodLiteral<649>, z.ZodLiteral<650>, z.ZodLiteral<651>, z.ZodLiteral<652>, z.ZodLiteral<653>, z.ZodLiteral<654>, z.ZodLiteral<655>, z.ZodLiteral<656>, z.ZodLiteral<657>, z.ZodLiteral<658>, z.ZodLiteral<659>, z.ZodLiteral<660>, z.ZodLiteral<661>, z.ZodLiteral<662>, z.ZodLiteral<663>, z.ZodLiteral<664>, z.ZodLiteral<665>, z.ZodLiteral<666>, z.ZodLiteral<667>, z.ZodLiteral<668>, z.ZodLiteral<669>, z.ZodLiteral<670>, z.ZodLiteral<671>, z.ZodLiteral<672>, z.ZodLiteral<673>, z.ZodLiteral<674>, z.ZodLiteral<675>, z.ZodLiteral<676>, z.ZodLiteral<677>, z.ZodLiteral<678>, z.ZodLiteral<679>, z.ZodLiteral<680>, z.ZodLiteral<681>, z.ZodLiteral<682>, z.ZodLiteral<683>, z.ZodLiteral<684>, z.ZodLiteral<685>, z.ZodLiteral<686>, z.ZodLiteral<687>, z.ZodLiteral<688>, z.ZodLiteral<689>, z.ZodLiteral<690>, z.ZodLiteral<691>, z.ZodLiteral<692>, z.ZodLiteral<693>, z.ZodLiteral<694>, z.ZodLiteral<695>, z.ZodLiteral<696>, z.ZodLiteral<697>, z.ZodLiteral<698>, z.ZodLiteral<699>]>, z.ZodUnion<[z.ZodLiteral<300>, z.ZodLiteral<301>, z.ZodLiteral<302>, z.ZodLiteral<303>, z.ZodLiteral<304>, z.ZodLiteral<305>, z.ZodLiteral<306>, z.ZodLiteral<307>, z.ZodLiteral<308>, z.ZodLiteral<309>, z.ZodLiteral<310>, z.ZodLiteral<311>, z.ZodLiteral<312>, z.ZodLiteral<313>, z.ZodLiteral<314>, z.ZodLiteral<315>, z.ZodLiteral<316>, z.ZodLiteral<317>, z.ZodLiteral<318>, z.ZodLiteral<319>, z.ZodLiteral<320>, z.ZodLiteral<321>, z.ZodLiteral<322>, z.ZodLiteral<323>, z.ZodLiteral<324>, z.ZodLiteral<325>, z.ZodLiteral<326>, z.ZodLiteral<327>, z.ZodLiteral<328>, z.ZodLiteral<329>, z.ZodLiteral<330>, z.ZodLiteral<331>, z.ZodLiteral<332>, z.ZodLiteral<333>, z.ZodLiteral<334>, z.ZodLiteral<335>, z.ZodLiteral<336>, z.ZodLiteral<337>, z.ZodLiteral<338>, z.ZodLiteral<339>, z.ZodLiteral<340>, z.ZodLiteral<341>, z.ZodLiteral<342>, z.ZodLiteral<343>, z.ZodLiteral<344>, z.ZodLiteral<345>, z.ZodLiteral<346>, z.ZodLiteral<347>, z.ZodLiteral<348>, z.ZodLiteral<349>, z.ZodLiteral<350>, z.ZodLiteral<351>, z.ZodLiteral<352>, z.ZodLiteral<353>, z.ZodLiteral<354>, z.ZodLiteral<355>, z.ZodLiteral<356>, z.ZodLiteral<357>, z.ZodLiteral<358>, z.ZodLiteral<359>, z.ZodLiteral<360>, z.ZodLiteral<361>, z.ZodLiteral<362>, z.ZodLiteral<363>, z.ZodLiteral<364>, z.ZodLiteral<365>, z.ZodLiteral<366>, z.ZodLiteral<367>, z.ZodLiteral<368>, z.ZodLiteral<369>, z.ZodLiteral<370>, z.ZodLiteral<371>, z.ZodLiteral<372>, z.ZodLiteral<373>, z.ZodLiteral<374>, z.ZodLiteral<375>, z.ZodLiteral<376>, z.ZodLiteral<377>, z.ZodLiteral<378>, z.ZodLiteral<379>, z.ZodLiteral<380>, z.ZodLiteral<381>, z.ZodLiteral<382>, z.ZodLiteral<383>, z.ZodLiteral<384>, z.ZodLiteral<385>, z.ZodLiteral<386>, z.ZodLiteral<387>, z.ZodLiteral<388>, z.ZodLiteral<389>, z.ZodLiteral<390>, z.ZodLiteral<391>, z.ZodLiteral<392>, z.ZodLiteral<393>, z.ZodLiteral<394>, z.ZodLiteral<395>, z.ZodLiteral<396>, z.ZodLiteral<397>, z.ZodLiteral<398>, z.ZodLiteral<399>]>, z.ZodUnion<[z.ZodLiteral<500>, z.ZodLiteral<501>, z.ZodLiteral<502>, z.ZodLiteral<503>, z.ZodLiteral<504>, z.ZodLiteral<505>, z.ZodLiteral<506>, z.ZodLiteral<507>, z.ZodLiteral<508>, z.ZodLiteral<509>, z.ZodLiteral<510>, z.ZodLiteral<511>, z.ZodLiteral<512>, z.ZodLiteral<513>, z.ZodLiteral<514>, z.ZodLiteral<515>, z.ZodLiteral<516>, z.ZodLiteral<517>, z.ZodLiteral<518>, z.ZodLiteral<519>, z.ZodLiteral<520>, z.ZodLiteral<521>, z.ZodLiteral<522>, z.ZodLiteral<523>, z.ZodLiteral<524>, z.ZodLiteral<525>, z.ZodLiteral<526>, z.ZodLiteral<527>, z.ZodLiteral<528>, z.ZodLiteral<529>, z.ZodLiteral<530>, z.ZodLiteral<531>, z.ZodLiteral<532>, z.ZodLiteral<533>, z.ZodLiteral<534>, z.ZodLiteral<535>, z.ZodLiteral<536>, z.ZodLiteral<537>, z.ZodLiteral<538>, z.ZodLiteral<539>, z.ZodLiteral<540>, z.ZodLiteral<541>, z.ZodLiteral<542>, z.ZodLiteral<543>, z.ZodLiteral<544>, z.ZodLiteral<545>, z.ZodLiteral<546>, z.ZodLiteral<547>, z.ZodLiteral<548>, z.ZodLiteral<549>, z.ZodLiteral<550>, z.ZodLiteral<551>, z.ZodLiteral<552>, z.ZodLiteral<553>, z.ZodLiteral<554>, z.ZodLiteral<555>, z.ZodLiteral<556>, z.ZodLiteral<557>, z.ZodLiteral<558>, z.ZodLiteral<559>, z.ZodLiteral<560>, z.ZodLiteral<561>, z.ZodLiteral<562>, z.ZodLiteral<563>, z.ZodLiteral<564>, z.ZodLiteral<565>, z.ZodLiteral<566>, z.ZodLiteral<567>, z.ZodLiteral<568>, z.ZodLiteral<569>, z.ZodLiteral<570>, z.ZodLiteral<571>, z.ZodLiteral<572>, z.ZodLiteral<573>, z.ZodLiteral<574>, z.ZodLiteral<575>, z.ZodLiteral<576>, z.ZodLiteral<577>, z.ZodLiteral<578>, z.ZodLiteral<579>, z.ZodLiteral<580>, z.ZodLiteral<581>, z.ZodLiteral<582>, z.ZodLiteral<583>, z.ZodLiteral<584>, z.ZodLiteral<585>, z.ZodLiteral<586>, z.ZodLiteral<587>, z.ZodLiteral<588>, z.ZodLiteral<589>, z.ZodLiteral<590>, z.ZodLiteral<591>, z.ZodLiteral<592>, z.ZodLiteral<593>, z.ZodLiteral<594>, z.ZodLiteral<595>, z.ZodLiteral<596>, z.ZodLiteral<597>, z.ZodLiteral<598>, z.ZodLiteral<599>]>, z.ZodUnion<[z.ZodLiteral<200>, z.ZodLiteral<201>, z.ZodLiteral<202>, z.ZodLiteral<203>, z.ZodLiteral<204>, z.ZodLiteral<205>, z.ZodLiteral<206>, z.ZodLiteral<207>, z.ZodLiteral<208>, z.ZodLiteral<209>, z.ZodLiteral<210>, z.ZodLiteral<211>, z.ZodLiteral<212>, z.ZodLiteral<213>, z.ZodLiteral<214>, z.ZodLiteral<215>, z.ZodLiteral<216>, z.ZodLiteral<217>, z.ZodLiteral<218>, z.ZodLiteral<219>, z.ZodLiteral<220>, z.ZodLiteral<221>, z.ZodLiteral<222>, z.ZodLiteral<223>, z.ZodLiteral<224>, z.ZodLiteral<225>, z.ZodLiteral<226>, z.ZodLiteral<227>, z.ZodLiteral<228>, z.ZodLiteral<229>, z.ZodLiteral<230>, z.ZodLiteral<231>, z.ZodLiteral<232>, z.ZodLiteral<233>, z.ZodLiteral<234>, z.ZodLiteral<235>, z.ZodLiteral<236>, z.ZodLiteral<237>, z.ZodLiteral<238>, z.ZodLiteral<239>, z.ZodLiteral<240>, z.ZodLiteral<241>, z.ZodLiteral<242>, z.ZodLiteral<243>, z.ZodLiteral<244>, z.ZodLiteral<245>, z.ZodLiteral<246>, z.ZodLiteral<247>, z.ZodLiteral<248>, z.ZodLiteral<249>, z.ZodLiteral<250>, z.ZodLiteral<251>, z.ZodLiteral<252>, z.ZodLiteral<253>, z.ZodLiteral<254>, z.ZodLiteral<255>, z.ZodLiteral<256>, z.ZodLiteral<257>, z.ZodLiteral<258>, z.ZodLiteral<259>, z.ZodLiteral<260>, z.ZodLiteral<261>, z.ZodLiteral<262>, z.ZodLiteral<263>, z.ZodLiteral<264>, z.ZodLiteral<265>, z.ZodLiteral<266>, z.ZodLiteral<267>, z.ZodLiteral<268>, z.ZodLiteral<269>, z.ZodLiteral<270>, z.ZodLiteral<271>, z.ZodLiteral<272>, z.ZodLiteral<273>, z.ZodLiteral<274>, z.ZodLiteral<275>, z.ZodLiteral<276>, z.ZodLiteral<277>, z.ZodLiteral<278>, z.ZodLiteral<279>, z.ZodLiteral<280>, z.ZodLiteral<281>, z.ZodLiteral<282>, z.ZodLiteral<283>, z.ZodLiteral<284>, z.ZodLiteral<285>, z.ZodLiteral<286>, z.ZodLiteral<287>, z.ZodLiteral<288>, z.ZodLiteral<289>, z.ZodLiteral<290>, z.ZodLiteral<291>, z.ZodLiteral<292>, z.ZodLiteral<293>, z.ZodLiteral<294>, z.ZodLiteral<295>, z.ZodLiteral<296>, z.ZodLiteral<297>, z.ZodLiteral<298>, z.ZodLiteral<299>]>, z.ZodUnion<[z.ZodLiteral<900>, z.ZodLiteral<901>, z.ZodLiteral<902>, z.ZodLiteral<903>, z.ZodLiteral<904>, z.ZodLiteral<905>, z.ZodLiteral<906>, z.ZodLiteral<907>, z.ZodLiteral<908>, z.ZodLiteral<909>, z.ZodLiteral<910>, z.ZodLiteral<911>, z.ZodLiteral<912>, z.ZodLiteral<913>, z.ZodLiteral<914>, z.ZodLiteral<915>, z.ZodLiteral<916>, z.ZodLiteral<917>, z.ZodLiteral<918>, z.ZodLiteral<919>, z.ZodLiteral<920>, z.ZodLiteral<921>, z.ZodLiteral<922>, z.ZodLiteral<923>, z.ZodLiteral<924>, z.ZodLiteral<925>, z.ZodLiteral<926>, z.ZodLiteral<927>, z.ZodLiteral<928>, z.ZodLiteral<929>, z.ZodLiteral<930>, z.ZodLiteral<931>, z.ZodLiteral<932>, z.ZodLiteral<933>, z.ZodLiteral<934>, z.ZodLiteral<935>, z.ZodLiteral<936>, z.ZodLiteral<937>, z.ZodLiteral<938>, z.ZodLiteral<939>, z.ZodLiteral<940>, z.ZodLiteral<941>, z.ZodLiteral<942>, z.ZodLiteral<943>, z.ZodLiteral<944>, z.ZodLiteral<945>, z.ZodLiteral<946>, z.ZodLiteral<947>, z.ZodLiteral<948>, z.ZodLiteral<949>, z.ZodLiteral<950>, z.ZodLiteral<951>, z.ZodLiteral<952>, z.ZodLiteral<953>, z.ZodLiteral<954>, z.ZodLiteral<955>, z.ZodLiteral<956>, z.ZodLiteral<957>, z.ZodLiteral<958>, z.ZodLiteral<959>, z.ZodLiteral<960>, z.ZodLiteral<961>, z.ZodLiteral<962>, z.ZodLiteral<963>, z.ZodLiteral<964>, z.ZodLiteral<965>, z.ZodLiteral<966>, z.ZodLiteral<967>, z.ZodLiteral<968>, z.ZodLiteral<969>, z.ZodLiteral<970>, z.ZodLiteral<971>, z.ZodLiteral<972>, z.ZodLiteral<973>, z.ZodLiteral<974>, z.ZodLiteral<975>, z.ZodLiteral<976>, z.ZodLiteral<977>, z.ZodLiteral<978>, z.ZodLiteral<979>, z.ZodLiteral<980>, z.ZodLiteral<981>, z.ZodLiteral<982>, z.ZodLiteral<983>, z.ZodLiteral<984>, z.ZodLiteral<985>, z.ZodLiteral<986>, z.ZodLiteral<987>, z.ZodLiteral<988>, z.ZodLiteral<989>, z.ZodLiteral<990>, z.ZodLiteral<991>, z.ZodLiteral<992>, z.ZodLiteral<993>, z.ZodLiteral<994>, z.ZodLiteral<995>, z.ZodLiteral<996>, z.ZodLiteral<997>, z.ZodLiteral<998>, z.ZodLiteral<999>]>]>;
//# sourceMappingURL=index.d.ts.map