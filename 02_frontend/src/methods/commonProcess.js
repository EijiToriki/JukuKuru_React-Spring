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


/*
セレクトボックスの値をセットする（変更・削除の日付、時間帯の設定で使う）

event : 選択されたセレクトボックスの値を格納する
cnt : 何個目のフォームかを表す
list : 変更対象のリスト
setList : 更新用関数(useStateのsetXX)

*/
const handleSelectBoxChange = (event, cnt, list, setList) => {
  const newList = [...list]
  if(newList.length === cnt){
    newList.push(event.target.value)
  }else{
    newList[cnt] = event.target.value
  }
  setList(newList)
}


/*
更新・削除画面にて、フォームの個数を管理するリストの変更処理

formCnt : フォームの個数を管理する連番リスト
setFormCnt : 更新用関数

*/
const handleFormAdd = (formCnt, setFormCnt) => {
  const newFormCnt = [...formCnt]
  newFormCnt.push(newFormCnt.length)
  setFormCnt(newFormCnt)
}

/*
更新・削除画面にて、更新・削除ボタンを押されたときのエラーチェックをする関数

dateList : 日にちのリスト
komaList : コマのリスト
*/
const errorCheck = (dateList, komaList) => {
  if(dateList.length === 0){
    return false
  }
  if(dateList.length !== komaList.length){
    return false
  }
  for(let i=0; i<dateList.length; i++){
    for(let j=i+1; j<dateList.length; j++){
      if(dateList[i] === dateList[j] && komaList[i] === komaList[j]){
        return false
      }
    }
  }

  return true
}



export { getClassRoomId, handleSelectBoxChange, handleFormAdd, errorCheck }