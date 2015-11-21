class Common
  constructor: ->
    # no op

  toJson: (str) ->
    try
      JSON.parse(str)
    catch err
      {}
