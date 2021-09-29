import CommitData from "./CommitData";
import ReactWordcloud, { Scale } from 'react-wordcloud';

import internal from "stream";

const callbacks = {
    
    // getWordColor: (word: any)=> word.value > 50 ? "white" : "white",
    // onWordClick: console.log,
    // onWordMouseOver: console.log,
    // getWordTooltip: (word: any) => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options: ReactWordCloudOptions = {
    rotations: 0,
    rotationAngles: [-90, 0],
  };
  const size: [number, number] = [1600, 1000];
   
export default function CommitWordcloud(props: {commitData: CommitData}) {
    
    return (
      <ReactWordcloud
        callbacks={{
          getWordTooltip: () => undefined,
          getWordColor: (word: any) => "white"
        }}
        options={{
          
          padding: 0,
          scale: 'linear',
          rotations: 0,
          fontFamily: 'monospace',
          fontSizes: [10, 200]
        }}
        size={size}
        words={props.commitData.toWordCloudArray()}
      />
    );
  }



interface ReactWordCloudOptions {
  
  rotations: number,
  rotationAngles: [number, number]
}