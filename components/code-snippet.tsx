"use client";

import { motion } from "framer-motion";

export function CodeSnippet() {
  return (
    <motion.div
      className="code-snippet-window"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="code-snippet-header">
        <div className="code-snippet-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="code-snippet-tab">
          <span className="tab-icon">◈</span>
          unet_model.py
        </div>
      </div>
      <div className="code-snippet-body">
        <div className="code-line">
          <span className="line-number">1</span>
          <span className="keyword">def</span> <span className="function">build_unet</span>
          <span className="punctuation">(</span>
          <span className="param">input_shape</span>
          <span className="punctuation">=</span>
          <span className="string">(256, 256, 3)</span>
          <span className="punctuation">):</span>
        </div>
        <div className="code-line">
          <span className="line-number">2</span>
          <span className="indent">    </span>
          <span className="comment"># Urban Sprawl Prediction - U-Net architecture</span>
        </div>
        <div className="code-line">
          <span className="line-number">3</span>
          <span className="indent">    </span>
          <span className="keyword">inputs</span>
          <span className="punctuation"> = </span>
          <span className="function">Input</span>
          <span className="punctuation">(</span>
          <span className="param">shape</span>
          <span className="punctuation">=</span>
          <span className="param">input_shape</span>
          <span className="punctuation">)</span>
        </div>
        <div className="code-line">
          <span className="line-number">4</span>
          <span className="indent">    </span>
          <span className="comment"># Encoder path</span>
        </div>
        <div className="code-line">
          <span className="line-number">5</span>
          <span className="indent">    </span>
          <span className="variable">c1</span>
          <span className="punctuation"> = </span>
          <span className="function">Conv2D</span>
          <span className="punctuation">(</span>
          <span className="number">64</span>
          <span className="punctuation">, </span>
          <span className="number">3</span>
          <span className="punctuation">, </span>
          <span className="param">activation</span>
          <span className="punctuation">=</span>
          <span className="string">&apos;relu&apos;</span>
          <span className="punctuation">)(</span>
          <span className="variable">inputs</span>
          <span className="punctuation">)</span>
        </div>
        <div className="code-line">
          <span className="line-number">6</span>
          <span className="indent">    </span>
          <span className="variable">p1</span>
          <span className="punctuation"> = </span>
          <span className="function">MaxPooling2D</span>
          <span className="punctuation">()(</span>
          <span className="variable">c1</span>
          <span className="punctuation">)</span>
        </div>
        <div className="code-line highlight">
          <span className="line-number">7</span>
          <span className="indent">    </span>
          <span className="variable">c2</span>
          <span className="punctuation"> = </span>
          <span className="function">Conv2D</span>
          <span className="punctuation">(</span>
          <span className="number">128</span>
          <span className="punctuation">, </span>
          <span className="number">3</span>
          <span className="punctuation">, </span>
          <span className="param">activation</span>
          <span className="punctuation">=</span>
          <span className="string">&apos;relu&apos;</span>
          <span className="punctuation">)(</span>
          <span className="variable">p1</span>
          <span className="punctuation">)</span>
        </div>
        <div className="code-line">
          <span className="line-number">8</span>
          <span className="indent">    </span>
          <span className="keyword">return</span>
          <span className="function"> Model</span>
          <span className="punctuation">(</span>
          <span className="param">inputs</span>
          <span className="punctuation">, </span>
          <span className="param">outputs</span>
          <span className="punctuation">)</span>
        </div>
        <div className="code-line result">
          <span className="line-number">9</span>
          <span className="indent">    </span>
          <span className="comment"># → 85% accuracy on satellite classification</span>
        </div>
      </div>
    </motion.div>
  );
}
