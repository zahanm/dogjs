
    ||=======\       / ======= \      / ====== \                ||     / ===== \
    ||        \      ||       ||     /          \               ||    |         )
    ||         \     ||       ||    ||           |              ||     \
    ||          |    ||       ||    ||        ===)              ||       =====
    ||         /     ||       ||    ||                          ||             \
    ||        /      ||       ||     \          /     \         /     (         |
    ||=======/       \ ======= /      \ ====== /       \ ===== /       \ ===== /

A [Dog](http://dog-lang.org) framework for HTML frontends.

### HTML Structure
Each Dog structure has a matching HTML implementation

These templates are kept together in a section for dog
templates only, the `<dog> .. </dog>` tag.
Convention places this section at the top of your HTML
file.

#### notify

    <section notify="notification_name" holder="selector">
      {{ title }} .. {{ body }}
    </section>

#### ask

    <form ask="task_name" holder="selector">
      <input type="text" name="input_name">
    </form>

#### listen

    <form listen="listen_name" holder="selector">
      <input type="text" name="input_name">
    </form>

#### oneach

    <section oneach="oneach_name" subscribe="true">
      .. notify, ask and listen tags ..
    </section>

### Tracks
Tracks are instances of an event submitted to Dog.
For example, the submission to an `ASK` or a `LISTEN` is instantiated as a `track` on the
stream.

You access `track`s by subscribing to the stream of the `ON EACH` that it corresponds to.
That is the function of the `subscribe` attribute in the `oneach` tag.

### Events
You register listeners for events that can execute arbitrary javascript
with the contents of a message, for instance

    dogjs.on('message', function (data) {
      console.log( data['title'], data['body'] );
    });

The `load` event signifies that dogjs is done loading it's content into
the actual HTML structure. Use it to signify page load.

The `submitted` event is namespaced. It gets serialized as `submitted:command:name`
where `command` is a command like `ask` or `listen`, and `name` is the name of
said command. It gets fired when a form submission occurs for an `ASK` or `LISTEN`
to the server, **after** the response is received back on the client.

THe `notify` event fires every time a `notify` is received. In addition to
whatever else the notify might trigger.

### Target
The `holder` attribute in the source node is used to specify what the
holder node should be.
Usually, takes the form of a CSS selector, that should specify single DOM node.

    <form listen=".." holder="#tweetbox">
      ..
    </form>

Can also be the special value `dialog`, which targets a modal dialog that is
created for this element.

### Method
The `method` attribute in the holder node is used to specify
how the node is updated

#### append
Append a new child of the holder node

#### prepend
Add a new child at the beginning of the holder node

#### enqueue
Maintain queue for node, when current node clears

#### overwrite
Always overwrite holder node

#### update
Same as overwrite, except only triggered when it's the same object

#### fill
Currently called `replace`, only fill in if holder node is empty

### Pagination
We can work on different pages, emulated by `dogjs`.

Two special keys that are required: `default` and `templates`.
They denote exactly what oyu would expect.

    <script type="text/javascript" charset="utf-8">
      dogjs.pages({
        'default': 'index.html',
        'templates': 'templates.html',
        'about': 'about.html',
        'admin': 'admin.html'
      });
    </script>

`dogjs` then handles the details of switching between these pages.
It uses url-fragments to manage state. Namely,

    http://www.example.com/#admin

will navigate to the `admin` page.

### Browser Requirements
HTML5 compatibilty

- `element.addEventListener( .. )`
- `fd = new FormData(form)`

