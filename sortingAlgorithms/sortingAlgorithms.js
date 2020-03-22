/*export const mergeSort = array => {
    if (array.length===1) return array;
    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = mergeSort(array.slice(0,middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));
    const sortedArray=[];
    let i=0,
      j = 0;
    while(i<firstHalf.length  &&  j<secondHalf.length)
    {
        if (firstHalf[i] < secondHalf[j])
        {
            sortedArray.push(firstHalf[i++]);
        }
        else{
            sortedArray.push(secondHalf[j++]);
        }
    }
    while(i<firstHalf.length) sortedArray.push(firstHalf[i++]);
    while(j<secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
};*/

export function mergeSort(array)
{
    const anim = [];
    if (array.length <=1) return array;
    const auxarray = array.slice();
    mergeSortH(array , 0 ,array.length-1 , auxarray , anim);
    return anim;
}

function mergeSortH(mainArray , startId , endId , auxarray , anim)
{
    if (startId===endId) return;
    const middleIdx = Math.floor((startId +endId) / 2);
    mergeSortH(auxarray , startId ,middleIdx , mainArray , anim);
    mergeSortH(auxarray , middleIdx+1 , endId , mainArray , anim);
    doMerge(mainArray , startId , middleIdx ,endId , auxarray , anim);
}

function doMerge(
    mainArray,
    startId,
    middleIdx,
    endId,
    auxarray,
    anim,
) {
    let k = startId;
    let i = startId;
    let j = middleIdx +1;
    while(i<=middleIdx && j<=endId){
        anim.push([i,j]);//to color change
        anim.push([i,j]);//to revert color
        if (auxarray[i] <= auxarray[j])
        {
            anim.push([k,auxarray[i]]);//overwriting kth value in orig array with ith value in auxarray
            mainArray[k++] = auxarray[i++];
        }
        else{
            anim.push([k,auxarray[j]]);
            mainArray[k++] = auxarray[j++];
        }
    }

    while(i<=middleIdx){
        anim.push([i,i]);//to color change
        anim.push([i,i]);
        anim.push([k,auxarray[i]]);
        mainArray[k++] = auxarray[i++];
    }
    while(j<=endId){
        anim.push([j,j]);//to color change
        anim.push([j,j]);
        anim.push([k,auxarray[j]]);
        mainArray[k++] = auxarray[j++];
    }
}