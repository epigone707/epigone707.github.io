"""
This script will format a markdown file by adding a newline character after each newline character
"""

import argparse
import os
dirname = os.path.dirname(__file__)


# input file example:
"""
---
layout: post
title: "Build Personal Blog with Jekyll and Github Pages"
category: tech
tags: web
modify: 2022-07-25 18:09:00
---

# title

line1
line2
line3
"""

# output file:
"""
---
layout: post
title: "Build Personal Blog with Jekyll and Github Pages"
category: tech
tags: web
modify: 2022-07-25 18:09:00
---
<!-- processed -->
# title



line1

line2

line3

"""





def main():
    parser = argparse.ArgumentParser(description='Input the filename.')
    parser.add_argument('-f','--filename', type=str, nargs='+',
                        help='filenames that will be formatted')
    parser.add_argument('-n', '--novel')
    args = parser.parse_args()
    post_dir = "_posts"
    
    if args.filename: # usage 1: python3 _util/novel_cn_formatter.py -f f1.md
        print("args.filename:",args.filename)
        for fname in args.filename:
            filename = os.path.join(dirname, fname)
            process(filename)
    elif args.novel: # usage 2: python3 _util/novel_cn_formatter.py -n wizard

        posts = os.listdir(post_dir)
        print(posts)
        for post_fname in posts:
            if post_fname[:len(args.novel)] == args.novel:
                filename = os.path.join(post_dir, post_fname)
                process(filename)

def process(filename):
    
    with open(filename, encoding = 'utf-8') as f:
        # perform file operations
        lines = f.readlines()
        flag = False
        start_idx = -1
        for idx, line in enumerate(lines):
            if line == "---\n" and idx != 0:
                flag = True
                start_idx = idx + 1
                continue
            if idx == start_idx:
                if lines[idx] == "<!-- processed -->\n":
                    print(f"{filename} has been processed, skip.")
                    return
                else:
                    lines[idx] = "<!-- processed -->\n"
                    continue
            if flag:
                lines[idx] += "\n"
    # print(lines)
    with open(filename, "w") as f:
        lines = "".join(lines)
        f.write(lines)
    print(f"{filename} has just been processed.")



if __name__ == "__main__":
    main()