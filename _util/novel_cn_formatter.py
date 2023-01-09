"""
This script will format a novel post written in markdown
"""

# usage 1: python3 _util/novel_cn_formatter.py -f f1.md
# usage 2: python3 _util/novel_cn_formatter.py -n wizard

# input file example:
"""
---
layout: post
title: "test post f1"
category: tech
tags: web
modify: 2022-07-25 18:09:00
---

1 chapter one
say hello
goodbye

2 chapter two
let's go!
"""

# output file:
"""
---
layout: post
title: "test post f1"
category: tech
tags: web
modify: 2022-07-25 18:09:00
---
<!-- processed -->
## 1 chapter one

say hello

goodbye



## 2 chapter two

let's go!

"""

import argparse
import os
dirname = os.path.dirname(__file__)







def main():
    parser = argparse.ArgumentParser(description='Input the filename.')
    parser.add_argument('-f','--filename', type=str, nargs='+',
                        help='filenames that will be formatted')
    parser.add_argument('-n', '--novel')
    args = parser.parse_args()
    post_dir = "_posts"
    
    if args.filename: 
        print("args.filename:",args.filename)
        for fname in args.filename:
            filename = os.path.join(dirname, fname)
            process(filename)
    elif args.novel: 

        posts = os.listdir(post_dir)
        print(posts)
        for post_fname in posts:
            splited = post_fname.split("-")
            if len(splited) < 3:
                continue
            if splited[3][:len(args.novel)] == args.novel:
                filename = os.path.join(post_dir, post_fname)
                process(filename)

def process(filename):
    
    with open(filename, encoding = 'utf-8') as f:
        # perform file operations
        lines = f.readlines()
        start_idx = -1
        for idx, line in enumerate(lines):
            if line == "---\n" and idx != 0:
                start_idx = idx + 1
                break
        if start_idx == -1 or lines[start_idx] =="<!-- processed -->\n":
            print(f"{filename} has been processed, skip.")
            return
        lines[start_idx] = "<!-- processed -->\n"
        for idx in range(start_idx+1, len(lines)):
            if lines[idx][0] in ['0','1','2','3','4','5','6','7','8','9']:
                lines[idx] = '## ' + lines[idx]
            lines[idx] += "\n"
    # print(lines)
    with open(filename, "w") as f:
        lines = "".join(lines)
        f.write(lines)
    print(f"{filename} has just been processed.")



if __name__ == "__main__":
    main()