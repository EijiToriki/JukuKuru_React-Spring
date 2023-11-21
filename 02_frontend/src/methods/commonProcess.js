
/*
授業日と授業時間から授業IDを返す

classObj : 授業ID, 日付, 授業時間（コマ）を要素とするオブジェクト
date : 日付
koma : 授業時間（コマ）
*/
const getClassRoomId = (classObj, date, koma) => {
  for(const oneClass of classObj){
    if(oneClass.date === date && oneClass.class_time === koma){
      return oneClass.id
    }
  }
  return -1
}


export { getClassRoomId }