# SSG(Static Site Generator)

## SSG is a program that creating html file with a text file.

---

### features

  + command flags
    + -v or -version : show its current version
    + -h or -help : show the instruction of command line
    + -i or -input: allow file or folder as input
    + -l or -lang : allow to change lang for html
    + -o or -output : allow to create the directory for output html files
    + -c or -config : allow to accept json file as a input
  
  + create html file from input (a text file or all the text file in the input folder)
  + create html file from input (a md file or all the md file in the input folder)
  + create a new directory called the next argument, folling after option -o or -output

### Prerequisite

- open your favorite terminal
- Make sure you are in the a1-ssg folder
- type the following command

```
npm i -g [code URL]

code URL: https://github.com/jjung99/a1-ssg.git

```

### Uasge

- To see the version

```
 a1-ssg -v
```

- To see the help

```
 a1-ssg -h
```


+ To generate html file (example commands) 

    + file name "abc.txt"
      ```
       a1-ssg -i abc.txt
      ```
      
    + folder name "abc"
      ```
       a1-ssg -i abc
      ```    
    + file name "abc.md"
      ```
       a1-ssg -i abc.md
      ```
    + file name "abc.md" with franch lang version
      ```
        a1-ssg -i abc.md -l fr
      ```
    + directory name "output" that contains abc.html file converted from text file
      ```
        a1-ssg -i abc.txt -o output
      ```
    + config file name "ssg-config.json"
      ```
        a1-ssg -c ssg-config.json
      ```


