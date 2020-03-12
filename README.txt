Complete Block-Level Visual Debugger for Blockly

Blockly is a visual programming editor by Google, being opensource multi-platform and multi-language, while offering jigsaw-style program
blocks. It is very popular and currently adopted by an increasing number of visual development solutions. However, as with similar earlier 
tools, it lacks a fullscale debugger. We present a complete visual debugger for Blockly, working over blocks, supporting the full range of 
debugging features as with typical source-level debuggers. To support all tracing functions we make no amendments to the underlying JavaScript 
engine, supporting all debugging operations through code instrumentation inserting invocations to a busy-wait debugger service loop. The latter
affects only the source code that is output by Blockly.

Including:
    1. Breakpoints
    2. Tracing
    3. Watches

Run: 
    1. open the terminal 
    2. inside the dummy_IDE dir --> npm run build