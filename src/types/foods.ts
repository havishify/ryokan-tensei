export type RegionType = "eu" /* 유럽 */ | "us" /* 미국 */ | "as" /* 아시아 */ | "co" /* 공통 */;

export enum SocalClass {
  Poor = 'poor',
  Normal = 'normal',
  Noble = 'noble'
};

export interface FoodRecord<ID extends string = string> {
  id: ID,
  v: string,
  region: RegionType | readonly RegionType[]
}

export const food = <T extends FoodRecord>(record: T) => record;

export type FoodTypes = DessertFoodTypes;

export type DessertFoodTypes = EuropeDessertFoodTypes | USADessertFoodTypes;

export type EuropeDessertFoodTypes = PoorEuropeDessertFoodTypes | NormalEuropeDessertFoodTypes | NobleEuropeDessertFoodTypes;
export type PoorEuropeDessertFoodTypes = 
  { id: 'biscuit', tx: '비스킷', region: 'eu' } |
  { id: 'baked-apple', tx: '구운 사과', region: ['eu', 'co'] } |
  { id: 'herbal-tea', tx: '허브차', region: 'eu' } |
  { id: 'black-tea', tx: '홍차', region: 'eu' };
export type NormalEuropeDessertFoodTypes = 
  { id: 'honey-butter-toast', tx: '허니 버터 토스트', region: ['eu', 'us', 'co'] } |
  { id: 'apple-tart', tx: '사과 타르트', region: 'eu' } |
  { id: 'berry-tart', tx: '베리 타르트', region: 'eu' } |
  { id: 'strawberry-tart', tx: '딸기 타르트', region: 'eu' } |
  { id: 'fruit-tart', tx: '과일 타르트', region: 'eu' } |
  { id: 'pound-cake', tx: '파운드 케이크', region: 'eu' } |
  { id: 'sponge-cake', tx: '스펀지 케이크', region: 'eu' } |
  { id: 'castella', tx: '카스텔라', region: 'eu' } |
  { id: 'marzipan', tx: '마지팬', region: 'eu' } |
  { id: 'pudding', tx: '푸딩', region: ['eu', 'us'] } |
  { id: 'raspberry-jelly', tx: '라즈베리 젤리', region: ['eu', 'us'] };
export type NobleEuropeDessertFoodTypes = 
  { id: 'creme brulee', tx: '크렘 브륄레' } |
  { id: 'macaron', tx: '마카롱' } |
  { id: 'chocolate-truffle', tx: '초콜릿 트러플' } |
  { id: 'petit-four', tx: '쁘띠푸르' } |
  { id: 'cheese-and-wine', tx: '치즈와 와인' } |
  { id: 'souffle', tx: '수플레' } |
  { id: 'gelato', tx: '젤라토' } |
  { id: 'ice-cream', tx: '아이스크림' } |
  { id: 'tiramisu', tx: '티라미수' };

export type USADessertFoodTypes = PoorUSADessertFoodTypes | NormalUSADessertFoodTypes | NobleUSADessertFoodTypes;
export type PoorUSADessertFoodTypes = 
  { id: 'cornbread', tx: '옥수수빵' } |
  { id: 'molasses-cookie', tx: '몰라시스 쿠키' } |
  { id: 'peanut-butter-sandwich', tx: '땅콩 버터 샌드위치' } |
  { id: 'cotton-candy', tx: '솜사탕' };
export type NormalUSADessertFoodTypes = 
  { id: 'apple-pie', tx: '사과 파이' } |
  { id: 'chocolate-brownie', tx: '브라우니' } |
  { id: 'pumpkin pie', tx: '호박 파이' } |
  { id: 'chocolate-cookie', tx: '초코칩 쿠키' } |
  { id: 'donut', tx: '도넛' } |
  { id: 'muffin', tx: '머핀' } |
  { id: 'milkshake', tx: '밀크셰이크' };
export type NobleUSADessertFoodTypes = 
  { id: 'umm', tx: '엄' };

export type AsiaDessertFoodTypes = PoorAsiaDessertFoodTypes;
export type PoorAsiaDessertFoodTypes = 
  { id: 'baked-sweet-potato', tx: '군고구마' } |
  { id: 'chapssal-tteok', tx: '찹쌀떡' } |
  { id: 'dalgona', tx: '달고나' } |
  { id: 'sweet-bean-jelly', tx: '양갱' } |
  { id: 'senbei', tx: '센베이' };