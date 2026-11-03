"use client";

import React, { useState } from "react";

const categori = ["Reserve", "Tosari", "CSW", "Adam Malik"];

export const WrapperCoba = () => {
  const [datas, setDatas] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const [vote, setVote] = useState(
    categori.map(() => ({ upvote: 0, downvote: 0 })),
  );

  const handleChangeAddDatas = () => {
    if (input.trim() === "") return;

    setDatas([...datas, input]);
    setInput("");
  };

  console.log(vote, "vote");

  console.log(datas, "datas");

  // technical flow
  // 1. input data dimasukkan ke dalam state dan tampilakan hasil semua input nya
  // 2. tampilkan hasil input data paling akhir

  const handleVoteCategori = (index: number, type: "upvote" | "downvote") => {
    // setVote((prevVotes) => {
    //   const updatedVotes = [...prevVotes];
    //   updatedVotes[index][type] += 1;
    //   return updatedVotes;
    // });

    setVote((prevVotes) =>
      prevVotes.map((v, i) => {
        if (i !== index) return v;

        if (type === "upvote") {
          return { upvote: v.upvote + 1, downvote: v.downvote };
        } else {
          return { upvote: v.upvote, downvote: v.downvote + 1 };
        }
      }),
    );

    // setVote((prevVotes) => {
    //   prevVotes.map((v, i) => {
    //     if (i !== index) return v;

    //      if (type === "upvote") {
    //       return { upvote: v.upvote + 1, downvote: v.downvote };
    //     } else {
    //       return { upvote: v.upvote, downvote: v.downvote + 1 };
    //     }
    //   })
    // });
  };

  return (
    <>
      {/* <div className="w-full flex justify-center items-center">
        <div className="flex flex-col gap-3">
          <h3>Technical Test Prectice</h3>
          <div className="flex flex-col gap-2">
            <input
              placeholder="input we something"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button className="btn btn-primary" onClick={handleChangeAddDatas}>
              Add +
            </button>
          </div>
        </div>
      </div> */}

      <div className="w-full flex flex-row gap-1">
        {categori.map((items) => (
          <>
            <div className="w-3xs flex flex-col shadow-2xl">
              <div className="p-3 flex justify-center items-center">
                <p className=" text-3xl font-bold">{items}</p>
              </div>
              <div className="w-full flex gap-2">
                <div
                  className="w-2/4 p-4 flex justify-center items-center flex-col"
                  onClick={() =>
                    handleVoteCategori(categori.indexOf(items), "upvote")
                  }>
                  <div className="w-full flex justify-center p-3 cursor-pointer items-center bg-green-600">
                    <p className=" text-lg font-bold">UP</p>
                  </div>
                  <div className="w-full flex justify-center items-center gap-1">
                    <span className="text-lg">
                      {vote[categori.indexOf(items)]?.upvote || 0}
                    </span>
                  </div>
                </div>
                <div
                  className="w-2/4 p-4 flex justify-center items-center flex-col"
                  onClick={() =>
                    handleVoteCategori(categori.indexOf(items), "downvote")
                  }>
                  <div className="w-full flex justify-center cursor-pointer p-3 items-center bg-red-600">
                    <p className=" text-lg font-bold">Down</p>
                  </div>
                  <div className="w-full flex justify-center items-center gap-1">
                    <span className="text-lg">
                      {vote[categori.indexOf(items)]?.downvote || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
