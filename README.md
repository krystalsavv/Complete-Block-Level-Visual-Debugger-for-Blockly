# Complete Block-Level Visual Debugger for Blockly

Blockly is a visual programming editor by Google, being opensource multi-platform and multi-language, while offering jigsaw-style program
blocks. It is very popular and currently adopted by an increasing number of visual development solutions. However, as with similar earlier 
tools, it lacks a fullscale debugger. We present a complete visual debugger for Blockly, working over blocks, supporting the full range of 
debugging features as with typical source-level debuggers. To support all tracing functions we make no amendments to the underlying JavaScript 
engine, supporting all debugging operations through code instrumentation inserting invocations to a busy-wait debugger service loop. The latter
affects only the source code that is output by Blockly.

## **Visual Debugger Features**
- Breakpoints per individual block
- Block-level tracing 
- Program variables inspection (watches)
 
## **Publication**
- [Savidis A., Savaki C. (2020) Complete Block-Level Visual Debugger for Blockly. In: Ahram T., Karwowski W., Pickl S., Taiar R. (eds) Human Systems Engineering and Design II. IHSED 2019. Advances in Intelligent Systems and Computing, vol 1026. Springer, Cham.](https://www.researchgate.net/publication/335170518_Complete_Block-Level_Visual_Debugger_for_Blockly)

## **Run**
- Open the terminal 
- Inside the dummy_IDE directory run ``npm run build`` command
