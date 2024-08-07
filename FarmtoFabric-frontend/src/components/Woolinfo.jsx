import React from 'react'

export default function Woolinfo() {
    return (
        <div className=' max-w-7xl m-auto '>
            

            <div class="content w-[100%]   bg-white pt-2">
                <p class="w-fit p-[35px] mt-[20px] text-justify text-[20px] text-gray-600 leading-[40px] ">
                    Wool, a natural fiber, offers warmth and breathability. It's sourced from sheep, goats, and rabbits, boasting diverse types like Merino, Cashmere, and Mohair. With its insulating properties, moisture-wicking ability, and biodegradability, wool is prized for clothing, textiles, and industrial uses. Sustainable and fire-resistant, wool requires proper care to maintain its quality. Explore the timeless charm and versatility of wool today.
                </p>
            </div>


            <div class=" m-auto content w-[100%]  pt-[10px] bg-[#ffff]">

                <div class="cards  grid grid-cols-1 gap-8 p-[20px] md:grid-cols-3 ">

                    <div class="card bg-[#4a90e2]  text-[#FFFF] p-5 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card1-img.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">100% natural</div>

                        <div class="data text-center text-[1.2rem] font-semibold">

                            Wool is 100% natural grown year-round by Australia’s 68 million sheep, consuming a simple blend of water, air, sunshine and grass.
                        </div>
                    </div>

                    <div class="card bg-[#FF6289]  text-[#FFFF] p-8 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card2.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">Biodegradable</div>

                        <div class="data text-center text-[1.2rem] font-semibold">
                            When a wool fibre is disposed of, it will naturally decompose in soil in a matter of years, slowly releasing valuable nutrients back into the earth.
                        </div>
                    </div>




                    <div class="card bg-[#fcbf58]  text-[#FFFF] p-8 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card3.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">100% renewable</div>

                        <div class="data text-center text-[1.2rem] font-semibold">
                            Every year Australian sheep produce a new fleece, making wool a completely renewable fibre.
                        </div>
                    </div>



                    <div class="card bg-[#44bfc3]  text-[#FFFF] p-8 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card4.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">Warm and cool</div>

                        <div class="data text-center text-[1.2rem] font-semibold">
                            In contrast to synthetics, Merino wool is an active fibre that reacts to changes in body temperature. So it helps you stay warm when the weather is cold, and cool when the weather is hot.                </div>
                    </div>




                    <div class="card bg-[#77b05d]  text-[#FFFF] p-8 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card5.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">Odour resistant</div>

                        <div class="data text-center text-[1.2rem] font-semibold">
                            In contrast to synthetics, Merino wool can absorb moisture vapour which means less sweat on your body. Merino wool even absorbs the odour molecules from sweat, which are only released upon washing.
                        </div>

                    </div>


                    <div class="card bg-[#7d78b1]  text-[#FFFF] p-8 rounded-[1.2rem] flex flex-col items-center gap-4">

                        <img src={require("./images/card6.gif")} alt="" class="w-[110px] h-[110px] p-4 mt-4 rounded-[50%] bg-white" />

                        <div class="para-title mt-[10px] font-bold text-[2rem]">Soft on skin</div>

                        <div class="data text-center text-[1.2rem] font-semibold">
                            Merino wool fibres are extremely fine, enabling them to bend far more than traditional, coarser wool fibres. This makes Merino wool feel soft and luxuriously gentle next to your skin.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
