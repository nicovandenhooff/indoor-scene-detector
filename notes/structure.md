# Draft file structure

Current idea of how to structure the project:

```
.
├── .gitignore
├── LICENSE
├── README.md
├── environment.yml
└── src/
    ├── assets/
    │   ├── header.css
    │   └── typography.css
    ├── models/
    │   ├── modelling.py
    │   ├── cnn.py
    │   └── saved/
    │       ├── model_1.pth
    │       └── model_2.pth
    ├── app.py
    ├── plotting.py
    └── utils.py
```

Some details:

- To discuss idea of having `dashboard` and `modelling` subfolders in `src`
- Mel's input on dash related file structure will be great, right now it's just inspired from MDS.
