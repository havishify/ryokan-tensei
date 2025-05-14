export type TableDetailProps = {
  title: string,
  position: {
    x: number,
    y: number,
  },
  name: string,
  mood: TableDetailMoods,
  portrait: string,
  foods: {
    best: 
  },
};

export type TableDetailMoods = '😍' | '😊' | '😐' | '😠' | '😡' | '';