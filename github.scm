#!/usr/bin/env chicken-scheme
(use call-with-query
     debug
     http-client
     medea)

(call-with-dynamic-fastcgi-query
 (lambda (query)
   ;; (debug query)
   (let ((user (query-any query 'user))
         (page (query-any query 'page)))
     (handle-exceptions exn
       (begin
         (display-status-&c. status-bad-request)
         (debug ((condition-property-accessor 'exn 'message) exn)
                ((condition-property-accessor 'exn 'arguments) exn)))
       (with-input-from-request
        (format "https://api.github.com/users/~a/repos?page=~a" user page)
        #f
        (lambda ()
          (display-content-type-&c. 'json)
          (let ((response (read-json)))
            (debug 'harro)
            ;; (debug response)lr\
            (write-json response))))))))
