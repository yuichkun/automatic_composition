module.exports =
`
;;;;;;;;;;;LENGTH FUNCTIONS;;;;;;;;;;;

(defun stretch (dur pitch &optional note-begin note-end)
  (let '(ret nil) '(pitch-len nil) '(tupletized nil) '(section nil)
    (setf pitch-len (length (flatten pitch)))
    (setf tupletized (gen-repeat pitch-len (/ dur pitch-len)))
    (if (eq note-begin nil)
      (progn
        (setf section (length tupletized))
      )
      (progn
        (if (eq note-end nil)
          (progn
            (setf note-end (length tupletized))
            (setf section (gen-integer note-begin note-end))
          )
          (progn
            (let '(end-point (- (length tupletized) (+ note-end 1)))
              (setf section (gen-integer note-begin end-point))
            )
          )
        )
      )
    )

    (setf ret (flatten (gen-pause (mclist (flatten tupletized)) :section section)))
    (return-from stretch ret)
  )
)

(defun rnd-rhythm (dur pitch low-begin high-begin low-end high-end)
  (let ((ret nil) (low-note nil) (high-note nil))
    (setf note-begin (rnd-range low-begin high-begin))
    (setf note-end (rnd-range low-end high-end))
    (setf ret (stretch dur pitch note-begin note-end))
    ret
  )
)
(defun rnd-rhythm2 (dur pitch low-num high-num)
  (let ((ret nil) (notes-num nil))
    (setf notes-num (rnd-range low-num high-num))
    (if (> (random 2) 0)
      (progn
            (setf ret (stretch dur pitch 0 notes-num))
      )
      (progn
            (setf ret (stretch dur pitch notes-num 0))
      )
    )
    ret
  )
)

(defun skip-notes (dur pitch note-freq rest-freq)
  (length-weight (stretch dur pitch) :weight (list note-freq rest-freq))
)


;;;;;;;;;;;PITCH FUNCTIONS;;;;;;;;;;;

(defun line-rnd (size a-low a-high)
  (let ((low-note nil) (high-note nil))
    (setf low-note (integer-to-pitch (rnd-range (pitch-to-integer a-low) (pitch-to-integer a-high))))
    (setf high-note (integer-to-pitch (rnd-range (pitch-to-integer a-low) (pitch-to-integer a-high))))
    (line size low-note high-note)
  )
)

(defun line (size low-note high-note &optional tilt)
  (let '(wave nil)
    (if (eq tilt nil)
      (setf tilt 1.0)
    )
    (setf wave (gen-transition 1 10 size tilt))
    (return-from line (vector-to-pitch (list low-note high-note) wave))
  )
)

(defun rnd-pitch (low-num high-num low-note high-note tonality)
  (let ((result nil) (counter (rnd-range low-num high-num)) (this-pitch nil))
    (dotimes (i counter)
      (setf this-pitch (randomize-octaves (list low-note high-note) (list (rnd-pick (expand-tonality (list low-note tonality))))))
      (push this-pitch result)
    )
    (flatten result)
  )
)

;;;;;;;;;;;EXTRA;;;;;;;;;;;
(defun artif-harm (pitchs)
  (let '(ret nil)
    (loop for pitch in pitchs do
      (push (chordize (interval-map pitch '(5))) ret)
    )
    (reverse ret)
  )
)
`;
