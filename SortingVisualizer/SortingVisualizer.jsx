import React from 'react';
import './SortingVisualizer.css' ; 
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js' ; 

export default class SortingVisualizer extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            array: [],
        };//main array
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array = [];
        for (let i=0;i< 310 ;i++){
            array.push(randomIntFromInterval(5, 730));  // random value generation function 
        }
        this.setState({array}) ; //resets the state with this new array

    }

    mergeSort(){
        const anim = sortingAlgorithms.mergeSort(this.state.array);
        for (let i=0;i<anim.length;i++)
        {
                const arrayBars = document.getElementsByClassName('array-bar');
                const isColor =i % 3 !== 2; //color change for every triplet
                if (isColor){
                    const [barO ,barT] = anim[i];
                    const barOStyle = arrayBars[barO].style;
                    const barTStyle = arrayBars[barT].style;
                    const color = i % 3 == 0 ? "red" : "indigo" ;
                    setTimeout(() => {
                        barOStyle.backgroundColor = color;
                        barTStyle.backgroundColor = color;
                    },i*3);
                }
                else {
                setTimeout(() => {
                    const [barO, neH] = anim[i];
                    const barOStyle = arrayBars[barO].style;
                    barOStyle.height = `${neH}px`;

                } , i * 3);
            }
        }
    }
 
    quickSort(){//to be added later and it will be completed soon

    }

    heapSort(){

    }

    bubbleSort(){

    }

    testSortAlgo(){
        for (let i=0 ; i<100 ;i++)//100 arrays 
        {
            const array =[];
            const length = randomIntFromInterval(1,1000);//100 diff lengths for each array random num in 1->1000
            for (let i=0;i<length ;i++)
            {
                array.push(randomIntFromInterval(-1000 ,1000)); //random integer values in array
            }
            const jscopy = array.slice().sort((a,b) => a-b); //this is just for checking whether ms fn works fine or not using built-in sort
            const msortedArray = sortingAlgorithms.mergeSort(array.slice());
            //console.log(sortedArray);
            console.log(arraysAreEq(jscopy,msortedArray));
        }

    }

    render() {
        const {array} =this.state;

        return (
            <div className="array-container">
               {array.map((value , idx) => (
                   <div 
                    
                    className="array-bar"
                    key={idx} //to avoid console error
                    style={{height: `${value}px` }}>
                        
                    </div> //height of the 2px bar as per the array value
               ))} 
               <button onClick={() => this.resetArray()}>Generate New Array</button>
               <button onClick={() => this.mergeSort()}>Merge Sort</button>
               <button onClick={() => this.quickSort()}>Quick Sort</button>
               <button onClick={() => this.heapSort()}>Heap Sort</button>
               <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
               <button onClick={() => this.testSortAlgo()}>Test Sorting Algos</button>
            </div>
        );//mapping values of array to "array-bar" class , put key prop to get rid of console error 
    }
}

function randomIntFromInterval(min , max) { 
    return Math.floor(Math.random() * (max-min+1) + min);
}

function arraysAreEq(aro,art)
{
    if(aro.length != art.length) return false;
    for (let i=0 ; i<aro.length ;i++)
    {
        if (aro[i] != art[i]) return false ;
    }
    return true;
}