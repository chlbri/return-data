import { literal, union } from 'zod';

const serverErrorStatusSchema = union([
  literal(500),
  literal(501),
  literal(502),
  literal(503),
  literal(504),
  literal(505),
  literal(506),
  literal(507),
  literal(508),
  literal(509),
  literal(510),
  literal(511),
  literal(512),
  literal(513),
  literal(514),
  literal(515),
  literal(516),
  literal(517),
  literal(518),
  literal(519),
  literal(520),
  literal(521),
  literal(522),
  literal(523),
  literal(524),
  literal(525),
  literal(526),
  literal(527),
  literal(528),
  literal(529),
  literal(530),
  literal(531),
  literal(532),
  literal(533),
  literal(534),
  literal(535),
  literal(536),
  literal(537),
  literal(538),
  literal(539),
  literal(540),
  literal(541),
  literal(542),
  literal(543),
  literal(544),
  literal(545),
  literal(546),
  literal(547),
  literal(548),
  literal(549),
  literal(550),
  literal(551),
  literal(552),
  literal(553),
  literal(554),
  literal(555),
  literal(556),
  literal(557),
  literal(558),
  literal(559),
  literal(560),
  literal(561),
  literal(562),
  literal(563),
  literal(564),
  literal(565),
  literal(566),
  literal(567),
  literal(568),
  literal(569),
  literal(570),
  literal(571),
  literal(572),
  literal(573),
  literal(574),
  literal(575),
  literal(576),
  literal(577),
  literal(578),
  literal(579),
  literal(580),
  literal(581),
  literal(582),
  literal(583),
  literal(584),
  literal(585),
  literal(586),
  literal(587),
  literal(588),
  literal(589),
  literal(590),
  literal(591),
  literal(592),
  literal(593),
  literal(594),
  literal(595),
  literal(596),
  literal(597),
  literal(598),
  literal(599),
]);

export default serverErrorStatusSchema;
